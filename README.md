# mypass-verification
This is a standalone site that performs the notarty verification of a document notarized by Mypass

## Getting started

## Background

The MyPass project at the City of Austin explored the enforceability and usefulness of scanned copies of important documents.  One of the options available to texas is to employ a notary public to create a certified copy of the document in digital form.  Although state statutes are quite clear on the requirements to make a digital notarization our team was unable to find any existing tools to create digitally notarized certified copies.  So in the spirit of problem-solving for the common good, we created three things to enable the digital notarization ecosystem in Texas.  

### 1. A Data Standard

In order to meet the criteria laid out in the state statutes, we crafted two templates for notarization.  One for the handling of [recordable documents](https://github.com/cityofaustin/mypass-verification/docs/CopyCertificationbyDocumentCustodianTemplate.pdf) such as birth certificates and court documents, and another for [certified copies of non-recordable documents](https://github.com/cityofaustin/mypass-verification/docs/CertifiedCopyTemplate.pdf), which covers everything else. 

**Template** 
<img src="/docs/CertCopyTemp.png" align="middle" width="600" >

**Example Notarization**
<img src="/docs/CertCopyExample.png" align="middle" width="600" >
 
Once the template was created we had to create a means for a notary to cryptographically sign it and for that signature to be recorded with an immutable time stamp.  For this, we utilized an existing data standard called a [verifiable credential](https://www.w3.org/TR/vc-data-model/).   We designed a [VC schema](https://github.com/cityofaustin/mypass-verification/docs/VCschma.json) specifically for Texas notarizations.  It contains a record of the notarization issuance with all pertinent information about the notarization and no personally identifiable information about the owner of the document being notarized.  This allows for a fully GDPR compliant solution where records of notarizations can be made public while the privacy of the document owners is protected.     

<img src="/docs/Schema.png" align="middle" width="600" >

These two things, the notarization template, and transaction record work together to
fulfill all the requirements of the texas statues for digital notarizations

### 2. Notariztion Tools

Once we had a document standard to store and transmit digital notarizations we created the tools required to allow any registered notary in the state of texas to package a notarization and sign it.  These tools are embedded in the upload and notarize interface of the [MyPass web application](https://github.com/cityofaustin/mypass).  

<img src="/docs/Verify.png" align="middle" width="600" >

Our tool currently utilizes the Etherium distributed public ledger to record notarization issuance and to support privacy through decentralized public key infrastructure.  However, this is not a hard requirement of the tool or the data standard.  By using a DID based data standard any connection to the Etherium ecosystem can be replaced with a standard web URL, and records can be stored on a standard server.  Our team does not plan to implement these tools as stand-alone web services but we encourage others to fork our repo and extract these tools for themselves.

### 3. Decentralized Verification

<img src="/docs/Notarize.png" align="middle" width="600" >

Lastly, and specific to this repo.  Now that a digital standard was created, and tools existed to create digital notarizations, the public would need tools to be able to verify the authenticity of a digitally notarized document.  To fulfill this need, we created this decentralized verification tool.  Rather than a black box solution that gives a user a stamp of valid or invalid with no explanation of why, we created a tool that was fully transparent to technical and non-technical users alike.  Our desire is that anyone could understand the steps that were being taken, and could independently verify that the steps were performed correctly.  In this way, we hope to promote decentralized trust through both understanding and transparency.
