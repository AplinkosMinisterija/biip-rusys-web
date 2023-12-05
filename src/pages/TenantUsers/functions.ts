import { TableRow } from '../../components/tables/table';
import { TenantUserProps, User } from '../../types';
import { roleLabels } from '../../utils/texts';

export const mapUsers = (users: TenantUserProps[]): TableRow[] =>
  users.map((user: TenantUserProps) => {
    return {
      id: user?.id,
      fullName: `${user.firstName} ${user.lastName}`,
      phone: user.phone,
      email: user.email,
      role: roleLabels[user?.role],
    };
  });
