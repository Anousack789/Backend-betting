import { environment } from 'src/environments/environment';
export class Config {
  public static EndPoint = environment.endpoint + '/api/v1/';
  public static FileUrl = environment.endpoint + '/files/';
}
