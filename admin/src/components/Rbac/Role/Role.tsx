import { FC } from "react";

interface RoleTypes { }
const Role: FC<RoleTypes> = ((props: RoleTypes) => {

  return (
    <div style={{ marginTop: 100 }}>Role</div>
  )
})

export default Role;