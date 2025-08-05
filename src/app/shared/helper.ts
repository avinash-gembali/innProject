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
  organization: string;
  joinedOn: string;
  vehicle?: string; // ✅ NEW
  vehicleNumber?: string;
  kycDocument?: {
    category: string;
    fileName: string;
  };
  additionalDocument?: {
    category: string;
    fileName: string;
  };
}
