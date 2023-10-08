export interface JoinQuizSuccessResponse {
  _id:         string;
  title:       string;
  description: string;
  questions:   Question[];
  creatorEmail: string;
}

export interface Question {
  _id:     string;
  value:   string;
  type:    string;
  options: Option[];
}

export interface Option {
  _id:   string;
  value: string;
}
