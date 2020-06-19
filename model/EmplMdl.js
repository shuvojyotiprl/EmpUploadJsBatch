exports.employee=function(empId,empName,empDob,doj,empAddr,empType,empGender,empHrDtl,empWorkGroupDtl,allocatedProjectDtl)
    {
        this.empId=empId;
        this.empName=empName;
		this.empDob=empDob;
		this.doj=doj;
		this.empAddr=empAddr;
		this.empType=empType;
		this.empGender=empGender;
		this.empHrDtl=empHrDtl;
		this.empWorkGroupDtl=empWorkGroupDtl;
		this.allocatedProjectDtl=allocatedProjectDtl;
		
        this.setEmpId=function(empId)
        {
           empId=empId;
        }
        this.getEmpId=function()
        {
            return empId;
        }
        
		this.setEmpName=function(empName)
        {
           empName=empName;
        }
        this.getEmpNameame=function()
        {
            return empName;
        }
		
		this.setEmpDob=function(empDob)
        {
           empDob=empDob;
        }
        this.getEmpdob=function()
        {
            return empDob;
        }
		
		this.setDoj=function(doj)
        {
           doj=doj;
        }
        this.getDoj=function()
        {
            return doj;
        }
		
		this.setEmpAddr=function(empAddr)
        {
           empAddr=empAddr;
        }
        this.getEmpAddr=function()
        {
            return empAddr;
        }
		
		this.setEmpType=function(empType)
        {
           empType=empType;
        }
        this.getEmpType=function()
        {
            return empType;
        }
		
		this.setEmpGender=function(empGender)
        {
           empGender=empGender;
        }
        this.getEmpGender=function()
        {
            return empGender;
        }
		
		this.setEmpHrDtl=function(empHrDtl)
        {
           empHrDtl=empHrDtl;
        }
        this.getEmpHrDtl=function()
        {
            return empHrDtl;
        }
		
		this.setEmpWorkGroupDtl=function(empWorkGroupDtl)
        {
           empWorkGroupDtl=empWorkGroupDtl;
        }
        this.getEmpWorkGroupDtl=function()
        {
            return empWorkGroupDtl;
        }
		
		this.setAllocatedProjectDtl=function(allocatedProjectDtl)
        {
           allocatedProjectDtl=allocatedProjectDtl;
        }
        this.getAllocatedProjectDtl=function()
        {
            return allocatedProjectDtl;
        }
		

};