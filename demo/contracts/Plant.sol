pragma solidity ^0.4.0; 
pragma experimental ABIEncoderV2;
contract Plant{
    
    struct Joiner{
        address  _joinerAddress;
        string  _joinerName;
        uint8 _allTime;
        string[] _projects;
    }
    
    struct Publisher{
        address  _publisherAddress;
        string _publisherName;
        uint8  _allTime;
        string[] _projects;
    }
    
    struct Project{
        address _projectAddress;
        string _projectName;
    //项目时间
        uint8  _projectTime;
    //项目所需人数
        uint8  _maxCount;
    //项目公益时
        uint8  _maxJobTime;
    //项目结束标志
        bool  _isOpen;
      
       string  _publisher;
       string []  _joiners;
    }
    
    string [] private _publishersArray;
    string [] private _joinersArray;
    string [] private _projectsArray;
    mapping (string=>Publisher) private  _publishers;
    mapping (string=>Joiner)  private _joiners;
    mapping (string=>Project) private _projects;
    
    Publisher _publisher;
    Joiner _joiner;
    Project _project;
    
    function addNewJoiner(string name) public {
          string [] storage projecets;
           projecets.length = 0; 
        Joiner memory joiner = Joiner(msg.sender,name,0,projecets );
        _joiner = joiner;
        _joinersArray.push(joiner._joinerName);
        _joiners[joiner._joinerName] = joiner;
      
    }
    
    function addNewPublisher(string name,uint8 times) public{
        
         string [] storage projecets  ;
         projecets.length = 0;
        Publisher memory publisher =  Publisher(msg.sender,name,times,projecets);
        _publisher = publisher;
        _publishersArray.push(publisher._publisherName);
       _publishers[publisher._publisherName] = publisher;
       
    }
    
    function addNewProject(string name,uint8 projectTime,uint8 count,uint8 jobTime,string publisher)public{
        
       
         Publisher storage p = _publishers[publisher];
         
         if(p._allTime >= count*jobTime)
         {
              string [] storage joiners ;
             joiners.length  = 0;
            Project memory project =  Project(msg.sender,name,projectTime,count,jobTime,true, publisher, joiners);
            _project = project;
             p._projects.push(project._projectName);
        
        
            _projectsArray.push(project._projectName);
            _projects[project._projectName] = project;
         }
    }

    
   
    function showAProject(string aname)public  view  returns (address a,string name,uint8 projectTime,uint8 projectMaxCount,uint8 projectJobTime,string publisher,string str,bool isOpen){
       
        Project storage proJect = _projects[aname];
        a =  proJect._projectAddress;
        name =  proJect._projectName;
        projectTime = proJect._projectTime;
        projectMaxCount = proJect._maxCount;
        projectJobTime = proJect._maxJobTime;
        publisher =  proJect._publisher;
        string[] storage joiners =  proJect._joiners;
        for(uint i =0 ;i<joiners.length;i++){

           if(i == 0){
                str = stringAdd(str,joiners[0]);
            }else{
                str=stringAdd(str,",");
               str = stringAdd(str,joiners[i]);
            }
           
       }
        isOpen  = proJect._isOpen;
        return(a,name,projectTime, projectMaxCount,projectJobTime, publisher,str,isOpen);
    }
    
      function showProject()public view returns (address a,string name,uint8 projectTime,uint8 projectMaxCount,uint8 projectJobTime,string publisher,string str,bool isOpen){
       
        Project storage proJect = _projects[_project._projectName];
        a =  proJect._projectAddress;
        name =  proJect._projectName;
        projectTime = proJect._projectTime;
        projectMaxCount = proJect._maxCount;
        projectJobTime = proJect._maxJobTime;
        publisher =  proJect._publisher;
        string[] storage joiners =  proJect._joiners;
         
        for(uint i =0 ;i<joiners.length;i++){
            if(i == 0){
                str = stringAdd(str,joiners[0]);
            }else{
                str=stringAdd(str,",");
               str = stringAdd(str,joiners[i]);
            }
       }
        isOpen  = proJect._isOpen;
        return(a,name,projectTime, projectMaxCount,projectJobTime, publisher,str,isOpen);
    }
     
    
    function addInProject(string joiner,string project) public  returns(bool isJoined){
       
        isJoined =false;
        
        Joiner storage j = _joiners[joiner];
        
        Project storage proJect = _projects[project];
        string [] storage jo = proJect._joiners;
        for(uint i = 0;i<jo.length;i++){
            if(hashCompareInternal(j._joinerName,jo[i])){
                return isJoined;
            }
        }
        
        if(proJect._joiners.length < proJect._maxCount){
        
             proJect._joiners.push(joiner);
             j._projects.push(project);
             isJoined = true;
            
        }
        return isJoined;
        
    }
    
    function finishProject(string project) public payable returns(bool isSend){
        
        Project storage proJect = _projects[project];
        
        string storage publisher = proJect._publisher;
        string[] storage joiners  = proJect._joiners;
        uint8 jobtime = proJect._maxJobTime;
        for(uint i =0;i<joiners.length;i++){
            bytes memory tempEmptyStringTest = bytes(joiners[i]);
            if(tempEmptyStringTest.length != 0){
            isSend =  send(publisher,joiners[i],jobtime);
            if(isSend == false){
                proJect._isOpen=false;
                return isSend;
            }
                
            }
        }
        proJect._isOpen=false;
        return isSend;
    }
    
     
    function showJoiner() public view  returns(address a,string name, uint8 times,string str){
        Joiner storage j = _joiners[_joiner._joinerName];
       a = j._joinerAddress;
       name=j._joinerName;
       times = j._allTime;
       string [] storage projects= j._projects;
       
       for(uint i =0 ;i<projects.length;i++){
           
           if(i == 0){
                str = stringAdd(str,projects[0]);
            }else{
                str=stringAdd(str,",");
               str = stringAdd(str,projects[i]);
            }
           
       }

        return(a,name,times,str);
    }
    
    
     function showAJoiner(string aname) public view  returns(address a,string name, uint8 times,string str){
       Joiner storage j = _joiners[aname];
      a = j._joinerAddress;
       name=j._joinerName;
       times = j._allTime;
       string [] storage projects= j._projects;
       
       for(uint i =0 ;i<projects.length;i++){
          
          if(i == 0){
                str = stringAdd(str,projects[0]);
            }else{
                str=stringAdd(str,",");
               str = stringAdd(str,projects[i]);
            }
           
       }

        return(a,name,times,str);
    }
    
    function showAPublisher(string add)public view  returns(address a,string name,uint8 times,string str){
       Publisher storage p = _publishers[add];
        a = p._publisherAddress;
       name = p._publisherName;
        times =p._allTime;
         string [] storage projects= p._projects;
        for(uint i =0 ;i<projects.length;i++){
         
            if(i == 0){
                str = stringAdd(str,projects[0]);
            }else{
                str=stringAdd(str,",");
               str = stringAdd(str,projects[i]);
            }
           
       }
         
        return(a,name,times,str);
    }
    
    function showPublisher()public view  returns(address a,string name,uint8 times,string  str){
        Publisher storage p = _publishers[_publisher._publisherName];
        a = p._publisherAddress;
        name = p._publisherName;
        times =p._allTime;
         string [] storage projects= p._projects;
        for(uint i =0 ;i<projects.length;i++){
        
           if(i == 0){
                str = stringAdd(str,projects[0]);
            }else{
                str=stringAdd(str,",");
               str = stringAdd(str,projects[i]);
            }
       }
         
        return(a,name,times,str);
    }
    
    
  function send(string fromP,string toJ,uint8 times) public payable returns(bool isSend){
       
      Publisher storage publisher = _publishers[fromP];
      Joiner storage joiner = _joiners[toJ];
      if(publisher._allTime > times){
          publisher._allTime= publisher._allTime - times;
          joiner._allTime= joiner._allTime+times;
          _publisher = publisher;
          _joiner = joiner;
          isSend = true;
      }else{
          isSend = false;
      }
      return isSend; 
       
  }
   
   function showAllJoiners()public view returns (string  str){
    string[]   allJoiners  = _joinersArray;
       for(uint i =0 ;i< allJoiners.length;i++){
           if(i == 0){
                str = stringAdd(str, allJoiners[0]);
            }else{
                str=stringAdd(str,",");
               str = stringAdd(str, allJoiners[i]);
            }
       }
       
       return str;
   }
    
    function showAllPublishers()public view returns (string  str) {
      string[] allPublishers = _publishersArray;
        for(uint i =0 ;i< allPublishers.length;i++){
           if(i == 0){
                str = stringAdd(str, allPublishers[0]);
            }else{
                str=stringAdd(str,",");
               str = stringAdd(str, allPublishers[i]);
            }
       }
       return str;
   }
   
   function showAllProjects()public view returns (string  str) {
     string[] allProjects = _projectsArray;
       for(uint i =0 ;i< allProjects.length;i++){
           if(i == 0){
                str = stringAdd(str, allProjects[0]);
            }else{
                str=stringAdd(str,",");
               str = stringAdd(str, allProjects[i]);
            }
       }
       return str;
   }
   
   function stringAdd(string a, string b)public pure returns(string){
    bytes memory _a = bytes(a);
    bytes memory _b = bytes(b);
    bytes memory res = new bytes(_a.length + _b.length);
    for(uint i = 0;i < _a.length;i++)
        res[i] = _a[i];
    for(uint j = 0;j < _b.length;j++)
        res[_a.length+j] = _b[j];  
    return string(res);
    }
    
    function hashCompareInternal(string a, string b) internal returns (bool) {
        return keccak256(a) == keccak256(b);
    }
    
}