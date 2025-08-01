import { Helper } from './helper';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private helpers: Helper[] = [
    {
      id: 1,
      name: 'Aditi Sharma',
      role: 'Cook',
      imageUrl: '',
      employeeCode: 'C001',
      gender: 'Female',
      languages: ['English', 'Hindi'],
      mobileNo: '9876543210',
      emailId: 'aditi@example.com',
      type: 'Cook',
      organization: 'ASBL',
      joinedOn: '2022-01-15',
    },
    {
      id: 2,
      name: 'Rajesh Verma',
      role: 'Driver',
      imageUrl: '',
      employeeCode: 'D001',
      gender: 'Male',
      languages: ['Hindi', 'Telugu'],
      mobileNo: '9123456780',
      emailId: 'rajesh@example.com',
      type: 'Driver',
      organization: 'ASBL',
      joinedOn: '2023-03-10',
    },
    {
      id: 4,
      name: 'Aditi Sharma',
      role: 'Cook',
      imageUrl: '',
      employeeCode: 'C001',
      gender: 'Female',
      languages: ['English', 'Hindi'],
      mobileNo: '9876543210',
      emailId: 'aditi@example.com',
      type: 'Cook',
      organization: 'ASBL',
      joinedOn: '2022-01-15',
    },
    {
      id: 3,
      name: 'Rajesh Verma',
      role: 'Driver',
      imageUrl: '',
      employeeCode: 'D001',
      gender: 'Male',
      languages: ['Hindi', 'Telugu'],
      mobileNo: '9123456780',
      emailId: 'rajesh@example.com',
      type: 'Driver',
      organization: 'ASBL',
      joinedOn: '2023-03-10',
    },
    {
      id: 5,
      name: 'Aditi Sharma',
      role: 'Cook',
      imageUrl: '',
      employeeCode: 'C001',
      gender: 'Female',
      languages: ['English', 'Hindi'],
      mobileNo: '9876543210',
      emailId: 'aditi@example.com',
      type: 'Cook',
      organization: 'ASBL',
      joinedOn: '2022-01-15',
    },
    {
      id: 6,
      name: 'Rajesh Verma',
      role: 'Driver',
      imageUrl: '',
      employeeCode: 'D001',
      gender: 'Male',
      languages: ['Hindi', 'Telugu'],
      mobileNo: '9123456780',
      emailId: 'rajesh@example.com',
      type: 'Driver',
      organization: 'ASBL',
      joinedOn: '2023-03-10',
    },
  ];

  getHelpers() {
    return this.helpers;
  }

  addHelper(helper: Helper) {
    // Temporary ID logic for demo
    const newId = this.helpers.length
      ? Math.max(...this.helpers.map((h) => h.id)) + 1
      : 1;
    this.helpers.push({ ...helper, id: newId });
  }
}
