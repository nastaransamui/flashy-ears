import PropsType from 'prop-types'
import DataShow from '@/src/components/Shared/DataShow/DataShow';
import { FC } from 'react';
import PageContainer from '@/shared/PageContainer';

export interface RolesPropsType {

}

const Roles: FC<RolesPropsType> = (props: RolesPropsType) => {

  return (
    <PageContainer>
      <DataShow />
    </PageContainer>
  )
}

Roles.propTypes = {}

export default Roles;