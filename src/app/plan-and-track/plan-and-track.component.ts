// -------------------------------------------------------------------------------------------------------------------------------------------------------------
// parayer :: PlanAndTrackComponent
// Calendar & effort grid (and main) component
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
import { HttpClient }
	from '@angular/common/http';
import { Component, ViewChild } 	
	from '@angular/core';
import { MatTable } 
	from '@angular/material/table';	
import { Router } 
	from '@angular/router';	

import * as _
	from 'lodash';

import { DateTimeUtil, UI } 
	from '../core.utils';
import { NavigationComponent }	
	from '../navigation/navigation.component';

@Component({
	selector: 'app-plan-and-track',
	templateUrl: './plan-and-track.component.html',
	styleUrls: ['./plan-and-track.component.css']
})
//export class ActGridComponent implements AfterContentChecked, AfterViewChecked, OnDestroy, OnInit {
export class PlanAndTrackComponent  {

	@ViewChild(MatTable) table :MatTable<any> | undefined;
	displayedColumns: string[] = ['left', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'right'];
	myActList :Array<Activity> = []; 
	currentWeek :Array<any>;
	tslots: Array<GridLine> = [
	  	{ "name": "00:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "01:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "02:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "03:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "04:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "05:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "06:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "07:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "08:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "09:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "10:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "11:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "12:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "13:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "14:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "15:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "16:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "17:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "18:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "19:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "20:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "21:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "22:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
		{ "name": "23:00", "d1": "", "d2": "", "d3": "", "d4": "", "d5": "", "d6": "", "d7": "" },
	];
	
	constructor(
		private _http :HttpClient, 
		private _nav :NavigationComponent,
		private _router :Router) { 
		
		this._nav.showWait(true);
		this.currentWeek = DateTimeUtil.computeWeek(new Date());
		this._nav.setLocation('Plan & Track', 'book_online');
		this._nav.showWait(false);
	}
	/*	
	getActivity() :void {
	
		// TODO As per the manual, data-fetching should be done by a specific service
		let myActList :Array<Activity> = [];
		let usrId = UserService.getLoggedUser().id;
		this._http.get(`/_data/_design/activity/_view/activity-area-by-assign-usr?key="${usrId}"`, 
			{ "observe": "body", "responseType": "json"}).subscribe((actAreasData :any) => { 
				let areas :Array<Activity> = [];
				_.forEach(_.sortBy(actAreasData.rows, ['value.name']), (row :any) => {
					areas.push(new Activity(row));
				});	
				this._http.get(`/_data/_design/activity/_view/activity-group-by-assign-usr?key="${usrId}"`, 
					{ "observe": "body", "responseType": "json"}).subscribe((actGroupsData :any) => { 
						let groups :Array<Activity> = [];
						_.forEach(_.sortBy(actGroupsData.rows, ['value.name']), (row :any) => {
							groups.push(new Activity(row));
						});	
						this._http.get(`/_data/_design/activity/_view/project-by-assign-usr?key="${usrId}"`, 
							{ "observe": "body", "responseType": "json"}).subscribe((projectsData :any) => {
								let projects :Array<Activity> = [];
								_.forEach(_.sortBy(projectsData.rows, ['value.name']), function(row :any) {
									projects.push(new Activity(row));
								});
								_.forEach(areas, function(a :Activity) {
									//$scope.areas.push(a);
									myActList.push(a);
									_.forEach(_.filter(groups, function(g :Activity) {
										return g.parent==a.id;
									}), function(g :Activity) {
										//$scope.groups.push(g);
										myActList.push(g);
										_.forEach(_.filter(projects, function(p :Activity) {
											return p.parent==g.id;
										}), function(p :Activity) {
											//$scope.projects.push(p);
											myActList.push(p);
										})
									});
								});	
								this.myActList = myActList;
								this._nav.showWait(false);
							});
					});
			});
	}
		
	createActArea() :void {
		
		ActArea.create(UserService.getLoggedUser().id, this._http).then((a) => {
			History.make(`Created new activity group`, a._id, null, null, this._http); 
			this._router.navigateByUrl(`/act-area/${a._id}`);
		}, (reason) => {
			this._nav.showSnackBar(`Activity area creation failed: ${reason}`);
		});
	}
	
	createActGrp(actAreaId :string) :void {
		
		ActGroup.create(actAreaId, UserService.getLoggedUser().id, this._http).then((g) => {
			History.make(`Created new activity group`, g._id, null, null, this._http); 
			this._router.navigateByUrl(`/act-group/${g._id}`);
		}, (reason) => {
			this._nav.showSnackBar(`Activity group creation failed: ${reason}`);
		});	
	}
	
	createProject(actGrpId :string) :void {
		
		Project.create(actGrpId, UserService.getLoggedUser().id, this._http).then((p) => {
			History.make(`Created new project`, p._id, null, null, this._http); 
			this._router.navigateByUrl(`/project/${p._id}`);
		}, (reason) => {
			this._nav.showSnackBar(`Project creation failed: ${reason}`);
		});
	}
	
	*/
	
	// Required to force table header to be refreshed on week change 
	trackByIndex(i :number) {
		
		return i;
	}
	
	prevWeek() :void {
		
		this.goToDate(DateTimeUtil.addDays(this.currentWeek[3].d as Date, -7));
	}
	
	nextWeek() :void {
		
		this.goToDate(DateTimeUtil.addDays(this.currentWeek[3].d as Date, 7));
	}
	
	selectWeek(forDate :Date) {
    			
		this.goToDate(forDate);
  	}
	
	
	goToDate(target :Date) :void {
		
		this.currentWeek = DateTimeUtil.computeWeek(target);
		// TODO Fill in end date in week selector
		// TODO Reload this.tslots		
		this.table!.renderRows();
	}
}
 
export interface GridLine {
	
	"name" :string;
	"d1" :string;
	"d2" :string;
	"d3" :string;
	"d4" :string;
	"d5" :string;
	"d6" :string;
	"d7" :string;
}

export class Activity {
			
	id :string;
	type :string;
	name :string;
	descr :string;
	parent :string|null;
	url :string; 
			
	constructor(d :any) {
		
		this.id = d.id;
		this.type = d.value.type;
		this.name = d.value.name;
		this.descr = d.value.descr;
		switch(d.value.type) {
		case 'ActGrp':
			this.parent = d.value.actArea;
			this.url = `act-group`;
			break;
		case 'Project':
			this.parent = d.value.actGrp;
			this.url = `project`;
			break;
		default:
			this.parent = null;
			this.url = `act-area`;
		} 
	}
}
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
