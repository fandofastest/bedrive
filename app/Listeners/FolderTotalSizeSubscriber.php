<?php

namespace App\Listeners;

use App\Models\FileEntry;
use Common\Files\Events\FileEntriesDeleted;
use Common\Files\Events\FileEntriesMoved;
use Common\Files\Events\FileEntriesRestored;
use Common\Files\Events\FileEntryCreated;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Facades\DB;

class FolderTotalSizeSubscriber
{
    public function onEntryCreated(FileEntryCreated $event): void
    {
        $entry = $event->fileEntry;
        if ($entry->type !== 'folder' && $entry->parent_id) {
            $entry->allParents()->increment('file_size', $entry->file_size);
        }
    }

    public function onEntriesDeletedOrRestored(
        FileEntriesDeleted|FileEntriesRestored $event,
    ): void {
        $entries = app(FileEntry::class)
            ->withTrashed()
            ->whereIn('id', $event->entryIds)
            ->whereNotNull('parent_id')
            ->get();

        $parentIds = $entries
            ->flatMap(fn(FileEntry $entry) => $entry->getParentIds())
            ->unique();

        $fileSize = $entries->sum('file_size');
        $prefix = DB::getTablePrefix();
        if (is_a($event, FileEntriesDeleted::class)) {
            app(FileEntry::class)
                ->whereIn('id', $parentIds)
                ->where('file_size', '>', 0)
                ->update([
                    'file_size' => DB::raw(
                        "CASE WHEN {$prefix}file_size > 0 THEN {$prefix}file_size - $fileSize ELSE 0 END",
                    ),
                ]);
        } else {
            app(FileEntry::class)
                ->whereIn('id', $parentIds)
                ->increment('file_size', $fileSize);
        }
    }

    public function onEntriesMoved(FileEntriesMoved $event): void
    {
        $movedEntriesSize = app(FileEntry::class)
            ->whereIn('id', $event->entryIds)
            ->sum('file_size');

        // files could be moved from or to root
        if ($event->destination) {
            app(FileEntry::class)
                ->where('id', $event->destination)
                ->increment('file_size', $movedEntriesSize);
        }
        if ($event->source) {
            app(FileEntry::class)
                ->where('id', $event->source)
                ->decrement('file_size', $movedEntriesSize);
        }
    }

    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            FileEntryCreated::class,
            self::class . '@onEntryCreated',
        );

        $events->listen(
            FileEntriesMoved::class,
            self::class . '@onEntriesMoved',
        );

        $events->listen(
            [FileEntriesDeleted::class, FileEntriesRestored::class],
            self::class . '@onEntriesDeletedOrRestored',
        );
    }
}
