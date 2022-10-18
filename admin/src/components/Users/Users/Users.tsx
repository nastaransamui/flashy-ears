
import PropsType from 'prop-types'
import DataShow from '@/src/components/Shared/DataShow/DataShow';
import { FC } from 'react';
import PageContainer from '@/shared/PageContainer';

export interface UsersPropsType {

}

const Users: FC<UsersPropsType> = (props: UsersPropsType) => {

  return (
    <PageContainer>
      <DataShow />
    </PageContainer>
  )
}

Users.propTypes = {}

export default Users;