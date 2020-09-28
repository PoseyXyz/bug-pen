document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e){
    e.preventDefault();
    var issueDesc = document.getElementById('issueDescInput').value
    var issueSeverity = document.getElementById('issueSeverityInput').value
    var issueAssignedTo=document.getElementById('issueAssignedToInput').value

    var issueId=Date.now()

    var issueStatus = 'Open'

    var issue={
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

function setStatusClosed(id){
    var issues = JSON.parse(localStorage.getItem('issues'))

    for(let i = 0; i<issues.length; i++){
        if(issues[i].id==id){
            issues[i].status='Closed';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function deleteIssue(id){
    var issues = JSON.parse(localStorage.getItem('issues'))

    for(let i = 0; i<issues.length; i++){
        if(issues[i].id==id){
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function setColor(status){
    status==='Open' ? 'green' : 'red'

}

function fetchIssues(){
    var issues = JSON.parse(localStorage.getItem('issues'))
    var issuesList = document.getElementById('issuesList')

    issuesList.innerHTML='';

    for(let i=0; i<issues.length; i++){
        var id = issues[i].id;
        var desc= issues[i].description;
        var severity= issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issuesList.innerHTML+='<div class="issue">'+
        // '<h6>'+ id +'</h6>'+
        '<p><span>'+ status +'</span></p><div>'+
        '<h3>'+ desc +'</h3>'+
        '<p>'+ severity +'</p>'+
        '<p>'+ assignedTo +'</p>'+
        '<button class="btn1" onclick="setStatusClosed(\''+id+'\')">Close</button>'+
         '<button class="btn2" onclick="deleteIssue(\''+id+'\')">Delete</button>'+
        '</div>'
    }
}
