import { Navigate } from "react-router-dom";
import type { Admin, Client, UserRole } from "../types/user";

type WithPermissionProps = {
  user?: Admin | Client | null;
};

type WithPermissionOptions = {
  allowedRoles?: UserRole[];
  callbackUrl?: string;
};

function withPermission<P extends object>(
  WrappedComponent: React.ComponentType<P & WithPermissionProps>,
  { allowedRoles = [], callbackUrl = "/sign-in" }: WithPermissionOptions = {}
) {
  const WithPermissionWrapper = (props: P & WithPermissionProps) => {
    const { user, ...restProps } = props;

    if (!user || !allowedRoles.includes(user.id_role)) {
      return <Navigate to={callbackUrl} replace />;
    }

    return <WrappedComponent {...(restProps as P)} user={user} />;
  };

  return WithPermissionWrapper;
}

export default withPermission;
