export interface UserBaseDTO {
  //properties for user base
  user_id: number;
  email: string;
  role_id: number;
  password: string;
  username: string;

  //properties for profile user
  profile_id: number;
  fullname: string;
  no_hp: string;
  job: string;
  working_place: string;
  country_code: string;
  gender: string;
  created_date: Date;
  updated_date: Date;
}
