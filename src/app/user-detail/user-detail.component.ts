import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  id;
  UserData;
  EducationDetails = [];
  JobExperience;
  edFields = ['Course', 'Year', 'CGP', 'University'];
  cvfile: string;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.getById();
  }

  keys(item): Array<any> {
    return Object.keys(item);
  }

  cvLogic() {
    this.apiService.getCV(this.id).subscribe(
      (data: any) => {
        this.apiService.downLoadFile(data, this.cvfile)
      }
    );
  };

  getById() {
    this.apiService.getByID(this.id).subscribe((data: any) => {
      this.UserData = data.data.user;
      delete this.UserData.createdAt;
      delete this.UserData.updatedAt;
      for (let field in this.UserData) {
        console.log(field, this.UserData[field]);
        if (field === "cv" || field === "_id" || field === "dob") continue;
        // this.UserData[field] = this.UserData[field] ? JSON.parse(this.UserData[field]) : this.UserData.field;
        this.UserData[field] = JSON.parse(this.UserData[field]);
      }

      this.UserData.dob = this.UserData.dob.split("T")[0];
      if (this.UserData.education) this.EducationDetails = this.UserData.education;
      console.log("This is ed details", this.EducationDetails )
      this.JobExperience = this.UserData.jobexp;
      console.log(this.JobExperience);
      this.cvfile = this.UserData.cv ? this.UserData.name + '.' + this.UserData.cv.split('\\')[1].split('.')[1] : '';

    });
  }
}