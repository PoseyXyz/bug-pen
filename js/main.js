document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

/*add an issue*/
function saveIssue(e){
    e.preventDefault();
    let issueDesc = document.getElementById('issueDescInput').value
    let issueSeverity = document.getElementById('issueSeverityInput').value
    let issueAssignedTo=document.getElementById('issueAssignedToInput').value
    let issueId=Date.now()
    let issueStatus = 'Open'
    let issue={
        id:issueId,
        description:issueDesc,
        severity:issueSeverity,
        assignedTo:issueAssignedTo,
        status:issueStatus
    }
    if(localStorage.getItem('issues')==null){
        var issues=[];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues))
    }else{
        var issues =JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    document.getElementById('issueInputForm').reset();
    fetchIssues();
}

/*close an issue*/
function setStatusClosed(id){
    let issues = JSON.parse(localStorage.getItem('issues'))
    for(let i = 0; i<issues.length; i++){
        if(issues[i].id==id){
            issues[i].status='Closed';
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

/*delete an issue*/
function deleteIssue(id){
    let issues = JSON.parse(localStorage.getItem('issues'))
    for(let i = 0; i<issues.length; i++){
        if(issues[i].id==id){
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

/*display all issues from local storage*/
function fetchIssues(){
    let issues = JSON.parse(localStorage.getItem('issues'))
    let issuesList = document.getElementById('issuesList')
    issuesList.innerHTML='';
    for(let i=0; i<issues.length; i++){
        const id = issues[i].id;
        const desc= issues[i].description;
        const severity= issues[i].severity;
        const assignedTo = issues[i].assignedTo;
        let status = issues[i].status;
        issuesList.innerHTML+='<div class="issue">'+
        // '<h6>'+ id +'</h6>'+
        '<p class="status"><span>'+ status +'</span></p><div>'+
        '<h3>'+ desc +'</h3>'+
        '<p class="severity"><i class="fas fa-exclamation-triangle"></i>'+ severity +'</p>'+
        '<p><i class="far fa-edit"></i>'+ assignedTo +'</p>'+
        '<button class="btn1" onclick="setStatusClosed(\''+id+'\')">Close</button>'+
         '<button class="btn2" onclick="deleteIssue(\''+id+'\')">Delete</button>'+
        '</div>'
    }
}


