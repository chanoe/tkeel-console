import { getLocalUserInfo, RequestResult } from '@tkeel/console-utils';

import useQuery from '@/tkeel-console-plugin-tenant-users/hooks/useQuery';

const method = 'GET';

type RequestParams = {
  page_num?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  key_words?: string;
};

export interface User {
  tenant_id: string;
  user_id: string;
  external_id?: string;
  username: string;
  email?: string;
  nick_name?: string;
  avatar?: string;
  created_at: string;
  roles: string[];
}

export interface ApiData {
  '@type': string;
  page_num: number;
  page_size: number;
  total: number;
  users: User[];
}

export default function useUsersQuery({
  params,
  onSuccess,
}: {
  params?: RequestParams;
  onSuccess?: (
    data: RequestResult<ApiData, RequestParams, undefined>
  ) => unknown;
} = {}) {
  const { tenant_id: tenantId } = getLocalUserInfo();
  const url = `/security/v1/tenants/${tenantId}/users`;

  const { data, ...rest } = useQuery<ApiData, RequestParams>({
    url,
    method,
    params,
    reactQueryOptions: { onSuccess },
  });
  const users = data?.users ?? [];

  return { users, data, ...rest };
}