
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


function GetFIR(firid)
{
$.ajax({
        url: 'http://localhost:3000/api/wallet/police2%40fir-management-network/setDefault',
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
  

  furl='http://172.23.128.163:3000/api/org.example.firnet.RegisterFir/'+firid;
  $.ajax({
    url: furl,
    contentType: "application/json",
    type: 'GET',
    headers: {
      "X-Access-Token": "CcGaXxFNaxSb5FWjurtQAnrIhatXeREpCDfgIGaPbuEUZ9UUuWHpYryGnuxIk7wa"
  },
   success: function(firdata){
        //var p=data.police.split("#");
        evidenceArray=firdata.evidenceid;
        console.log("evidenceArray"+evidenceArray)
        console.log("evidenceArray[0]"+evidenceArray[0])
        //console.log('success'+JSON.stringify(firdata));
        //GetEvidence(evidenceid)
	document.getElementById("ipc").innerHTML="<b>IPC Section: </b>"+firdata.IPC;
	document.getElementById("obs").innerHTML="<b>Observation: </b>"+firdata.observation;
        for (i = 0; i < evidenceArray.length; i++) { 
          GetEvidence(evidenceArray[i],i+1)
	
        }
     //document.getElementById("Evidence").innerHTML=temp;
    },
    error: function(xhr, ajaxOptions, thrownError){
                alert(xhr.status+"  "+thrownError);
            }
});

}
temp=document.getElementById("Evidence").value;
function GetEvidence(evidenceid, count) {
  app_url='http://172.23.128.163:3000/api/org.example.firnet.EvidenceandTestimony/'+evidenceid
  $.ajax({
    url: app_url,
    contentType: "application/json",
    type: 'GET',
    headers: {
      "X-Access-Token": "CcGaXxFNaxSb5FWjurtQAnrIhatXeREpCDfgIGaPbuEUZ9UUuWHpYryGnuxIk7wa"
  },
	
   success: function(data){
       console.log('success'+JSON.stringify(data));
	//temp=temp+"<p>"+data.EvidenceDescription+"</p>";
	var par=document.createElement("P");
	par.innerHTML="*: "+data.EvidenceDescription;
        document.getElementById("Evidence").appendChild(par);
	var para=document.createElement("P");
	para.innerHTML="*: "+data.WitnessTestimony;
        document.getElementById("Testimony").appendChild(para);
	//document.getElementById("Testimony").innerHTML=document.getElementById("Testimony").value+"<p>"+data.WitnessTestimony+"</p>";
	//document.createElement("<p>"+data.WitnessTestimony+"</p>");
       
    },
    error: function(xhr, ajaxOptions, thrownError){
                alert(xhr.status+"  "+thrownError);
            }
});

}

function myFunction1() {

var z=document.getElementById("Fir_id").value;
GetFIR(z);
openForm2();
} 
function myFunction(s,hash) {
 console.log(s);
$.ajax({
        url: 'http://localhost:3000/api/wallet/police2%40fir-management-network/setDefault',
        contentType: "application/json",
        type: 'POST',
        headers: {
      "X-Access-Token": "CcGaXxFNaxSb5FWjurtQAnrIhatXeREpCDfgIGaPbuEUZ9UUuWHpYryGnuxIk7wa"
  },
       success: function(){
           console.log('success');
        },
        error: function(xhr, ajaxOptions, thrownError){
                    alert(xhr.status+"  "+thrownError);
                }
    });  

 $.ajax({
        url: 'http://172.23.128.163:3000/api/org.example.firnet.RegisterFirProposal?access_token=CcGaXxFNaxSb5FWjurtQAnrIhatXeREpCDfgIGaPbuEUZ9UUuWHpYryGnuxIk7wa',
        headers: {
        "Content-Type": "application/json"
    },
        type: 'POST',
        //contentType: 'application/json', 
	data:s,
        success: function(data){
	   alert("FIR Id is:"+hash)
           console.log(data);
        },
        error: function(data2){
                    console.log(data2.responseText);
                }
    });

};
var jsonstr;
var hashstr;
var st;

$('form').submit(function() {
  r=$(this).serializeArray();
 var fir_observation=document.getElementById("fir_observation").value;
  console.log(r);
  jsonstr=JSON.stringify(r);
  //console.log(jsonstr);
  getHash(jsonstr)
  .then(hash => {
    hashstr=hash;
    console.log(hash);

st='{"$class": "org.example.firnet.RegisterFirProposal","FIR": {"$class": "org.example.firnet.RegisterFir","RegFirId": "'+hashstr+'","IPC": "'+r[1].value+'","observation": "'+fir_observation.trim()+'","nofevidences": 0,"evidenceid": [],"proposal": "resource:org.example.firnet.FirProposal#'+r[0].value+'"}}';
console.log(st);

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


