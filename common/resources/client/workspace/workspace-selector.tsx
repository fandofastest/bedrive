import clsx from 'clsx';
import {cloneElement, Fragment, ReactElement, useEffect, useState} from 'react';
import {ButtonBase} from '../ui/buttons/button-base';
import {PersonalWorkspace, useUserWorkspaces} from './user-workspaces';
import {UnfoldMoreIcon} from '../icons/material/UnfoldMore';
import {AddIcon} from '../icons/material/Add';
import {NewWorkspaceDialog} from './new-workspace-dialog';
import {WorkspaceMembersDialog} from './workspace-members-dialog';
import {useActiveWorkspaceId} from './active-workspace-id-context';
import {DialogTrigger} from '../ui/overlays/dialog/dialog-trigger';
import {Workspace} from './types/workspace';
import {Dialog} from '../ui/overlays/dialog/dialog';
import {DialogBody} from '../ui/overlays/dialog/dialog-body';
import {Button, ButtonProps} from '../ui/buttons/button';
import {CheckIcon} from '../icons/material/Check';
import {Menu, MenuItem, MenuTrigger} from '../ui/navigation/menu/menu-trigger';
import {KeyboardArrowDownIcon} from '../icons/material/KeyboardArrowDown';
import {PersonAddIcon} from '../icons/material/PersonAdd';
import {DeleteIcon} from '../icons/material/Delete';
import {ExitToAppIcon} from '../icons/material/ExitToApp';
import {EditIcon} from '../icons/material/Edit';
import {RenameWorkspaceDialog} from './rename-workspace-dialog';
import {ConfirmationDialog} from '../ui/overlays/dialog/confirmation-dialog';
import {useDeleteWorkspace} from './requests/delete-workspace';
import {useRemoveMember} from './requests/remove-member';
import {useAuth} from '../auth/use-auth';
import {Trans} from '../i18n/trans';
import {LeaveWorkspaceConfirmation} from './leave-workspace-confirmation';
import {openDialog} from '@common/ui/overlays/store/dialog-store';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';

interface WorkspaceSelectorProps {
  className?: string;
  onChange?: (id: number) => void;
  trigger?: ReactElement<ButtonProps>;
}
export function WorkspaceSelector({
  onChange,
  className,
  trigger: propsTrigger,
}: WorkspaceSelectorProps) {
  const {data: workspaces, isFetched, isFetching} = useUserWorkspaces();
  const {workspaceId, setWorkspaceId} = useActiveWorkspaceId();
  const activeWorkspace = workspaces?.find(w => w.id === workspaceId);
  const [selectorIsOpen, setSelectorIsOpen] = useState(false);
  const {hasPermission} = useAuth();

  // if user no longer has access to previously selected workspace, select personal one
  useEffect(() => {
    // make sure we don't unset active workspace while user workspaces are being re-fetched
    if (isFetched && !isFetching && !activeWorkspace) {
      setWorkspaceId(PersonalWorkspace.id);
    }
  }, [activeWorkspace, workspaces, setWorkspaceId, isFetched, isFetching]);

  if (
    !activeWorkspace ||
    (!hasPermission('workspaces.create') && workspaces?.length === 1)
  ) {
    return null;
  }

  const defaultTrigger = (
    <ButtonBase
      className={clsx(
        'flex items-center gap-10 rounded ring-inset hover:bg-hover focus-visible:ring-2',
        className,
      )}
    >
      <span className="mr-auto block flex-auto overflow-hidden text-left">
        <span className="block overflow-hidden overflow-ellipsis text-sm font-medium text-main">
          {activeWorkspace.default ? (
            <Trans message={activeWorkspace.name} />
          ) : (
            activeWorkspace.name
          )}
        </span>
        <span className="block text-xs text-muted">
          {activeWorkspace.default ? (
            <Trans message="Personal workspace" />
          ) : (
            <Trans
              message=":count members"
              values={{count: activeWorkspace.members_count}}
            />
          )}
        </span>
      </span>
      <UnfoldMoreIcon className="shrink-0 icon-md" />
    </ButtonBase>
  );

  const trigger = propsTrigger || defaultTrigger;

  return (
    <Fragment>
      <DialogTrigger
        type="popover"
        isOpen={selectorIsOpen}
        onClose={() => {
          setSelectorIsOpen(false);
        }}
      >
        {cloneElement(trigger, {
          onClick: () => setSelectorIsOpen(!selectorIsOpen),
        })}
        <Dialog size="min-w-320">
          <DialogBody padding="p-10">
            <div className="mb-16 border-b pb-10">
              {workspaces?.map(workspace => (
                <WorkspaceItem
                  key={workspace.id}
                  workspace={workspace}
                  setSelectorIsOpen={setSelectorIsOpen}
                  onChange={onChange}
                />
              ))}
            </div>
            <div className="mb-4 px-4 text-center">
              <Button
                onClick={async e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectorIsOpen(false);
                  const workspaceId = await openDialog(NewWorkspaceDialog);
                  if (workspaceId) {
                    setWorkspaceId(workspaceId);
                    onChange?.(workspaceId);
                  }
                }}
                variant="outline"
                startIcon={<AddIcon />}
                color="primary"
                className="h-40 w-full"
              >
                <Trans message="Create new workspace" />
              </Button>
            </div>
          </DialogBody>
        </Dialog>
      </DialogTrigger>
    </Fragment>
  );
}

interface WorkspaceItemProps {
  workspace: Workspace;
  onChange: WorkspaceSelectorProps['onChange'];
  setSelectorIsOpen: (value: boolean) => void;
}
function WorkspaceItem({
  workspace,
  onChange,
  setSelectorIsOpen,
}: WorkspaceItemProps) {
  const {workspaceId, setWorkspaceId} = useActiveWorkspaceId();
  const isActive = workspaceId === workspace.id;

  return (
    <div
      onClick={() => {
        setWorkspaceId(workspace.id);
        onChange?.(workspace.id);
        setSelectorIsOpen(false);
      }}
      className={clsx(
        'mb-4 flex cursor-pointer items-center gap-12 rounded-lg p-10 text-left',
        isActive && 'bg-primary/5',
        !isActive && 'hover:bg-hover',
      )}
    >
      <CheckIcon
        size="sm"
        className={clsx('flex-shrink-0 text-primary', !isActive && 'invisible')}
      />
      <div className="flex-auto">
        <div className={clsx('text-sm', isActive && 'font-semibold')}>
          {workspace.name}
        </div>
        <div className="text-sm text-muted">
          {workspace.default ? (
            <Trans message="Personal workspace" />
          ) : (
            <Trans
              message=":count members"
              values={{count: workspace.members_count}}
            />
          )}
        </div>
      </div>
      {workspace.id !== 0 && (
        <ManageButton
          setSelectorIsOpen={setSelectorIsOpen}
          workspace={workspace}
          onChange={onChange}
        />
      )}
    </div>
  );
}

interface LeaveWorkspaceDialogProps {
  workspace: Workspace;
  onChange?: (id: number) => void;
}
function LeaveWorkspaceDialog({
  workspace,
  onChange,
}: LeaveWorkspaceDialogProps) {
  const removeMember = useRemoveMember();
  const {user} = useAuth();
  const {close} = useDialogContext();
  return (
    <LeaveWorkspaceConfirmation
      isLoading={removeMember.isPending}
      onConfirm={() => {
        removeMember.mutate(
          {
            workspaceId: workspace.id,
            memberId: user!.id,
            memberType: 'member',
          },
          {
            onSuccess: () => {
              close();
              onChange?.(PersonalWorkspace.id);
            },
          },
        );
      }}
    />
  );
}

interface DeleteWorkspaceConfirmationProps {
  workspace: Workspace;
  onChange?: (id: number) => void;
}
function DeleteWorkspaceConfirmation({
  workspace,
  onChange,
}: DeleteWorkspaceConfirmationProps) {
  const deleteWorkspace = useDeleteWorkspace();
  const {close} = useDialogContext();
  return (
    <ConfirmationDialog
      isDanger
      title={<Trans message="Delete workspace" />}
      body={
        <Trans
          message="Are you sure you want to delete “:name“?"
          values={{name: workspace.name}}
        />
      }
      confirm={<Trans message="Delete" />}
      isLoading={deleteWorkspace.isPending}
      onConfirm={() => {
        deleteWorkspace.mutate(
          {id: workspace.id},
          {
            onSuccess: () => {
              close();
              onChange?.(PersonalWorkspace.id);
            },
          },
        );
      }}
    />
  );
}

interface ManageButtonProps {
  setSelectorIsOpen: (value: boolean) => void;
  workspace: Workspace;
  onChange?: (id: number) => void;
}
function ManageButton({
  setSelectorIsOpen,
  workspace,
  onChange,
}: ManageButtonProps) {
  const {user} = useAuth();

  return (
    <MenuTrigger onItemSelected={() => setSelectorIsOpen(false)}>
      <Button
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
        color="primary"
        size="xs"
        variant="outline"
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Trans message="Manage" />
      </Button>
      <Menu>
        <MenuItem
          onClick={e => {
            e.stopPropagation();
            openDialog(WorkspaceMembersDialog, {workspace});
          }}
          value="workspaceMembers"
          startIcon={<PersonAddIcon />}
        >
          <Trans message="Members" />
        </MenuItem>
        {workspace.owner_id === user?.id && (
          <MenuItem
            onClick={e => {
              e.stopPropagation();
              openDialog(RenameWorkspaceDialog, {workspace});
            }}
            value="updateWorkspace"
            startIcon={<EditIcon />}
          >
            <Trans message="Rename" />
          </MenuItem>
        )}
        {workspace.owner_id !== user?.id && (
          <MenuItem
            onClick={e => {
              e.stopPropagation();
              openDialog(LeaveWorkspaceDialog, {workspace, onChange});
            }}
            value="leaveWorkspace"
            startIcon={<ExitToAppIcon />}
          >
            <Trans message="Leave" />
          </MenuItem>
        )}
        {workspace.owner_id === user?.id && (
          <MenuItem
            onClick={e => {
              e.stopPropagation();
              openDialog(DeleteWorkspaceConfirmation, {workspace, onChange});
            }}
            value="deleteWorkspace"
            startIcon={<DeleteIcon />}
          >
            <Trans message="Delete" />
          </MenuItem>
        )}
      </Menu>
    </MenuTrigger>
  );
}
