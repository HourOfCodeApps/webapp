export enum TimeslotStatus {
  NEEDS_APPROVE = 0,
  APPROVED = 10,
  NEEDS_MENTOR = APPROVED,
  MENTOR_NEEDS_APPROVE = 15,
  TIMESLOT_STATUSHAS_MENTOR = 20,
  REJECTED = 30,
}

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  policyAgreed: boolean;
}

export type Mentor = User & {
  approvedTimeslotsCount: number;
  timeslotsCount: number;
  wasMentorBefore: boolean;
}

export type Teacher = User & {
  isApproved: boolean;
  schoolId: School['id'];
}

export type School = {
  id: string;
  addressBuilding: string;
  addressStreet: string;
  availableTimeslotsCount: number;
  city: string;
  cityDistrict: string;
  latitude: number;
  longitude: number;
  name: string;
  phones: string[];
  subjectOfManagement: string;
  timeslotsCount: number;
  website: string;
}

export type Timeslot = {
  id: string;
  class: string;
  date: string;
  latitude: number;
  longitude: number;
  mentorId?: Mentor['id'];
  mentor: Mentor;
  pupilsCount: number;
  schoolId: School['id'];
  startTime: Date;
  status: TimeslotStatus;
}
