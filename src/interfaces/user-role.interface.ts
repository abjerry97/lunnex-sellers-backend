export enum RolesType {
  owner = 'owner',
  admin = 'admin',  
}

 export type UserRoleType = Record<string, Record<string, RolesType>>;