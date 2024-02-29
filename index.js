
var htmlStr = '';
//onclick event

function runFunc () {
  //import Geoprocessor from "@arcgis/core/rest/geoprocessor";
  console.log("run button is clicked");

  //trigger GP service
  require(["esri/tasks/Geoprocessor","esri/rest/support/JobInfo"], (Geoprocessor, JobInfo) => {
    // console.log("before gp def");
    var gp = new Geoprocessor('https://mygis.engeo.com/server/rest/services/CAF_23777/siteacessemailto/GPServer/siteacessemailto/');

    //define the input parameters
    // var params = {
    //   "Input_Feature": "",
    // };
  
    //submit the gp service
    // console.log("before gp submission");

    gp.submitJob().then(function(jobInfo){
    // gp.execute().then(function(jobInfo){ //CANNOT use execute() since the GP service job itself is defined as submitJob() operation
      // const jobid = jobInfo.jobId;
      // console.log("job id: ", jobid);

      // const status = jobInfo.jobStatus;
      // console.log("job status:", status);

      const options = {
        interval: 1000,
        statusCallback: (j) => {
          console.log("Job Status: ", j.jobStatus);
        }
      };

      jobInfo.waitForJobCompletion(options).then(() => {
        jobInfo.fetchResultData('Send_Email').then(function(result){
          console.log("job result:", result.value);
          htmlStr = result.value;
          // window.open(outputFileUrl, "_blank");
        });
      });

    }).catch(function(e) {
      console.log("GP job failed", e);
    });
    console.log("GP service job submitted");
  });

};


var emailBtnCounter = 0;

function emailFunc() {
  emailBtnCounter ++;
  console.log("email button is clicked");
  // document.getElementById("emailButtonID").style.color = 'blue';

  var emailDiv = document.createElement('div');
  emailDiv.style.textAlign = "center";

  if (htmlStr) {
    emailDiv.innerHTML = String(htmlStr);
  }

  if (emailBtnCounter == 1) {
    // document.getElementsByTagName('body')[0].appendChild(document.createElement('br'))
    document.getElementsByTagName('body')[0].appendChild(emailDiv);
  }
  
};


