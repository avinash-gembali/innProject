export interface Helper {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  employeeCode: string;
  gender: string;
  languages: string[];
  mobileNo: string;
  emailId: string;
  type: string;
  organization: string;
  joinedOn: string;
  kycDocument?: {
    category: string;
    fileName: string; // this should match what's stored in backend
  };
  additionalDocument?: {
    category: string;
    fileName: string; // store only name or base64 or URL
  };
}