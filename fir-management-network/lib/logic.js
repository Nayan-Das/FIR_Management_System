/**
 * submit proposal transaction
 * @param {org.example.firnet.SubmitFirProposal} tx
 * @transaction
 */
async function submitProposal(tx) {
  
  	const assetRegistry = await getAssetRegistry('org.example.firnet.FirProposal');
    let val=await assetRegistry.exists(tx.proposal.FirProposalId)
  	if (val) {
      return Promise.reject(tx.proposal.FirProposalId+' already exists.')
    }
  	await assetRegistry.add(tx.proposal)					
}
/**
 * submit proposal transaction
 * @param {org.example.firnet.RegisterFirProposal} tx
 * @transaction
 */
async function acceptFirProposal(tx) {
  
  	const assetRegistry = await getAssetRegistry('org.example.firnet.RegisterFir');
    let val=await assetRegistry.exists(tx.FIR.RegFirId)
  	if (val) {
      return Promise.reject(tx.FIR.RegFirId+' already exists.')
    }
  	const proposalRegistry = await getAssetRegistry('org.example.firnet.FirProposal');
    val=await proposalRegistry.exists(tx.FIR.proposal.FirProposalId)
  	if (!val) {
      return Promise.reject(tx.FIR.proposal.FirProposalId+' does not exist.')
    }
  
    val=await assetRegistry.exists(tx.FIR.proposal.FirProposalId)
  	if (val) {
      return Promise.reject('FIR ALREADY REGISTERED FOR PROPOSAL ID '+tx.FIR.proposal.FirProposalId)
    }
  	tx.FIR.proposal.appr="Accepted"
    tx.FIR.proposal.FirId=tx.FIR.RegFirId
  	await assetRegistry.add(tx.FIR)
  	await proposalRegistry.update(tx.FIR.proposal)
}

/**
 * submit proposal transaction
 * @param {org.example.firnet.RejectFirProposal} tx
 * @transaction
 */
async function rejectFirProposal(tx) {
 
  	const proposalRegistry = await getAssetRegistry('org.example.firnet.FirProposal');
    val=await proposalRegistry.exists(tx.proposal.FirProposalId)
  	if (!val) {
      return Promise.reject(tx.proposal.FirProposalId+' does not exist.')
    }
    const firRegistry = await getAssetRegistry('org.example.firnet.RegisterFir');
    val1=await firRegistry.exists(tx.proposal.FirProposalId)
  	if (val1) {
      return Promise.reject('FIR has already been registered against proposal id'+tx.proposal.FirProposalId)
    }
  	tx.proposal.appr="Rejected"
    await proposalRegistry.update(tx.proposal)					
}
/**
 * submit proposal transaction
 * @param {org.example.firnet.SubmitEvidenceandTestimony} tx
 * @transaction
 */
async function submitEvidenceandTestimony(tx) {
  
  	const assetRegistry = await getAssetRegistry('org.example.firnet.EvidenceandTestimony');
    let val=await assetRegistry.exists(tx.evidenceandtestimony.EnTid)
  	if (val) {
      return Promise.reject(tx.evidenceandtestimony.EnTid+' already exists.')
    }
  	const firRegistry = await getAssetRegistry('org.example.firnet.RegisterFir');
    val=await firRegistry.exists(tx.evidenceandtestimony.FIR.RegFirId)
  	if (!val) {
      return Promise.reject(tx.evidenceandtestimony.FIR.RegFirId+' does not exist.')
    }
   
    tx.evidenceandtestimony.FIR.nofevidences=tx.evidenceandtestimony.FIR.nofevidences+1
    tx.evidenceandtestimony.FIR.evidenceid[(tx.evidenceandtestimony.FIR.nofevidences)-1]=tx.evidenceandtestimony.EnTid
    await firRegistry.update(tx.evidenceandtestimony.FIR) 
    
  	await assetRegistry.add(tx.evidenceandtestimony)					
}