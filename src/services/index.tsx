import { AuthService } from "./auth-service";
import { ProductService } from "./product-service";
import { ProfileService } from "./profile-service";

export const service = {
  auth: new AuthService(),
  product: new ProductService(),
  profile: new ProfileService(),
};
