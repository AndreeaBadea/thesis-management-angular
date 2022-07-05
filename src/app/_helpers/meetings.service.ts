import {Injectable} from "@angular/core";
import {Project} from "../models/project";
import {Meeting} from "../models/meeting";


@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  private meetings = [
    {
      'idMeeting': 1,
      'date': '05 July',
      'hour': '18:00',
      'participantName': 'Raluca Mihaila',
      'meetingSubject': 'Weekly Meeting'
    },
  ];

  public getAllMeetings() : Meeting[]{
    return this.meetings;
  }



}
