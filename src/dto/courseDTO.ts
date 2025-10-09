export interface CourseDTO {
  course_id: number;
  course_name: string;
  description: string;
  user_id: number;
  rating: number;
  category_id: number;
  review_count: number;
  price: number;
  duration: number;
  certificate: boolean;
  createdAt: Date;
  updatedAt: Date;
}
