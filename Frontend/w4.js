
function openForm() {
  document.getElementById("myForm").style.display = "block";
closeForm1();
closeForm2();
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function openForm1() {
  document.getElementById("myForm1").style.display = "block";
  closeForm();
  closeForm2();
}

function closeForm1() {
  document.getElementById("myForm1").style.display = "none";
}
function openForm2() {
  document.getElementById("myForm2").style.display = "block";
  closeForm();
  closeForm1();
}

function closeForm2() {
  document.getElementById("myForm2").style.display = "none";
}


function GetFIRStatus(victimId,proposalId) {
  $.ajax({
        url: 'http://172.23.128.163:3000/api/wallet/VictimId%40fir-management-network/setDefault',
        contentType: "application/json",
        type: 'POST',
        headers: {
      "X-Access-Token": "CcGaXxFNaxSb5FWjurtQAnrIhatXeREpCDfgIGaPbuEUZ9UUuWHpYryGnuxIk7wa"
  },
       success: function(){
           alert('success');
        },
        error: function(xhr, ajaxOptions, thrownError){
                    alert(xhr.status+"  "+thrownError);
                }
    });
  app_url='http://172.23.128.163:3000/api/org.example.firnet.FirProposal/'+proposalId
  $.ajax({
    url: app_url,
    contentType: "application/json",
    type: 'GET',
    headers: {
      "X-Access-Token": "CcGaXxFNaxSb5FWjurtQAnrIhatXeREpCDfgIGaPbuEUZ9UUuWHpYryGnuxIk7wa"
  },
   success: function(data){
       console.log('success'+JSON.stringify(data));
       console.log("data.victimid"+data.victimid+" : "+victimId)
       if (data.victimid != victimId)
       {
         alert("The FIR is not created by the Victim")
       }
       else{
	var p=data.police.split("#");
	document.getElementById("prop_id").innerHTML ="<b>FIR Proposal ID: </b>"+data.FirProposalId;
	document.getElementById("victim").innerHTML ="<b>Victim Name:</b>"+data.victimname;
	document.getElementById("victim_add").innerHTML ="<b>Victim Address: </b>"+data.victimaddress;
	document.getElementById("accused").innerHTML ="<b>Accused Name:</b>"+data.Accused;
	document.getElementById("accused_add").innerHTML ="<b>Accused Name:</b>"+data.AccusedAddress;
	document.getElementById("polic_station").innerHTML ="<b>Police Station:</b>"+p[1];
	document.getElementById("fir_desc1").innerHTML ="<b>FIR Description:</b>"+data.FirDescription;
	document.getElementById("status").innerHTML ="<b>FIR Status:</b>"+data.appr;
        if(data.FirID!="Not Assigned")GetFIRDetails(data);
	 openForm2();
       }
       
    },
    error: function(xhr, ajaxOptions, thrownError){
                alert(xhr.status+"  "+thrownError);
            }
});

}
function GetFIRDetails(data)
{
  var firid=data.FirId;
  furl='http://172.23.128.163:3000/api/org.example.firnet.RegisterFir/'+firid;
  $.ajax({
    url: furl,
    contentType: "application/json",
    type: 'GET',
    headers: {
      "X-Access-Token": "CcGaXxFNaxSb5FWjurtQAnrIhatXeREpCDfgIGaPbuEUZ9UUuWHpYryGnuxIk7wa"
  },
   success: function(firdata){
        
        console.log('success'+JSON.stringify(firdata));
	document.getElementById("ipc").innerHTML ="<b>IPC Section:</b>"+firdata.IPC;
        document.getElementById("cmnt").innerHTML ="<b>Observation:</b>"+firdata.observation;


   
    },
    error: function(xhr, ajaxOptions, thrownError){
                console.log(xhr.status+"  "+thrownError);
            }
});

}


function myFunction1() {
s=document.getElementById("victim_id").value;
s1=document.getElementById("Fir_id").value;
GetFIRStatus(s,s1);
} 
function myFunction(s,hash) {
 console.log(s);
$.ajax({
        url: 'http://172.23.128.163:3000/api/wallet/VictimId@fir-management-network/setDefault',
        contentType: "application/json",
        type: 'POST',
        headers: {
      "X-Access-Token": "CcGaXxFNaxSb5FWjurtQAnrIhatXeREpCDfgIGaPbuEUZ9UUuWHpYryGnuxIk7wa"
  },
       success: function(){
           alert('success');
        },
        error: function(xhr, ajaxOptions, thrownError){
                    alert(xhr.status+"  "+thrownError);
                }
    });

 $.ajax({
        url: 'http://172.23.128.163:3000/api/org.example.firnet.SubmitFirProposal',
        headers: {
        "Content-Type": "application/json",
        "X-Access-Token": "CcGaXxFNaxSb5FWjurtQAnrIhatXeREpCDfgIGaPbuEUZ9UUuWHpYryGnuxIk7wa"
    },
        type: 'POST',
        //contentType: 'application/json', 
	data:s,
        success: function(data){
           console.log(data);
           alert("Your Proposal Id is:"+hash);
		 //setTimeout(location.reload(),10000);
        },
        error: function(error){
                    console.log(error.responseText);
  			// setTimeout(location.reload(),10000);
                }
    });

};
var jsonstr;
var hashstr;
var st;

$('form').submit(function() {
  r=$(this).serializeArray();
 var fir_desc=document.getElementById("fir_desc").value;
  //console.log(r);
  jsonstr=JSON.stringify(r);
  //console.log(jsonstr);
  getHash(jsonstr)
  .then(hash => {
    hashstr=hash;
    console.log(hash);
st='{ "$class": "org.example.firnet.SubmitFirProposal", "proposal": { "$class": "org.example.firnet.FirProposal","victimid": "'+r[1].value+'","victimaddress": "'+r[2].value+'","victimname": "'+r[0].value+'","FirProposalId": "'+hashstr+'","FirDescription": "'+fir_desc.trim()+'","Accused": "'+r[3].value+'","AccusedAddress": "'+r[4].value+'","appr": "NoAction", "FirId": "Not Assigned", "police": "resource:org.example.firnet.PoliceStation#'+r[5].value+'"}}';
//console.log(st);

myFunction(st,hashstr);
  });
//console.log(hashstr);


  return false;
});
function getHash(str, algo = "SHA-256") {
  let strBuf = new TextEncoder('utf-8').encode(str);
  return crypto.subtle.digest(algo, strBuf)
    .then(hash => {
      window.hash = hash;
      let result = '';
      const view = new DataView(hash);
      for (let i = 0; i < hash.byteLength; i += 4) {
        result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
      }
      return result;
    });
}


