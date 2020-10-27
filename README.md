# mypass-verification
This is a standalone site that performs the notarty verification of a document notarized by Mypass

[Live Site Demo](http://texas-digital-notary.s3-website.us-east-2.amazonaws.com/) - *this is hosted just for demonstration purposes, and will be taken down at the conclusion of the MyPass project.*

## Getting started

To get started, install node and npm

    npm install

Copy .env.local or .env.prod to .env

    npm start

In the browser open http://localhost:3000

## Project Background

The MyPass project at the City of Austin explored the enforceability and usefulness of scanned copies of important documents.  One of the options available to people in Texas is to employ a notary public to create a certified copy of the document in digital form.  Although state statutes are quite clear on the requirements to make a digital notarization our team was unable to find any existing tools to create digitally notarized certified copies.  So in the spirit of problem-solving for the common good, we created three things to enable the digital notarization ecosystem in Texas.  

### 1. A Data Standard

In order to meet the criteria laid out in the state statutes, we crafted two templates for notarization.  

1. Template for the handling of [recordable documents](/docs/CopyCertificationbyDocumentCustodianTemplate.pdf) such as birth certificates and court documents 
2. Template for [certified copies of non-recordable documents](/docs/CertifiedCopyTemplate.pdf), which covers everything else 

**Template** 

<kbd><img src="/docs/CertCopyTemp.png" align="middle" width="800" ></kbd>

**Example Notarization**

<kbd><img src="/docs/CertCopyExample.png" align="middle" width="800" ></kbd>
 
Next we had to create a means for a notary to cryptographically sign it and for that signature to be recorded with an immutable time stamp.  For this, we utilized an existing W3C data standard called a [verifiable credential](https://www.w3.org/TR/vc-data-model/), and we designed a [VC schema](docs/VCschema.json) specifically for Texas notarizations.  The schema contains a record of the notarization issuance with all pertinent information about the notarization and no personally identifiable information about the owner of the document being notarized.  This allows for a fully GDPR compliant solution where records of notarizations can be made public while the privacy of the document owners is protected.     

<img src="/docs/Schema.png" align="middle" width="600" >

These two things, the notarization template, and transaction record work together to
fulfill all the requirements of the texas statues for digital notarizations

### 2. Notarization Tools

We created the tools to allow any registered notary in the state of texas to package a digital notarization using our templates and sign it according to Verifiable Credential spec.  These tools are embedded in the upload and notarize interface of the [MyPass web application](https://github.com/cityofaustin/mypass).  

<img src="/docs/Notarize.png" align="middle" width="800" >

Our tool currently utilizes the Etherium distributed public ledger to record a notarization's issuance and to support privacy through decentralized public key infrastructure.  However, our use of Etherium services is not a hard requirement of the tool or the data standard.  By using a DID based data standard any connection to the Etherium ecosystem can be replaced with a standard web URL, and records can be stored on a standard server.  Our team does not plan to implement these tools as stand-alone web services but we encourage others to fork our repo and extract these tools for themselves.

More information and documentation can be found here - https://github.com/cityofaustin/mypass-verification/tree/main/src/components/NotarizePageComponents

### 3. Decentralized Verification

<img src="/docs/Verify.png" align="middle" width="800" >

We created this decentralized verification tool so the public would be able to verify the authenticity of a digitally notarized document.  Rather than a black box solution that gives a user a stamp of valid or invalid with no explanation of why, we created a tool that was fully transparent to technical and non-technical users alike.  Our desire is that anyone could understand the steps that were being taken, and could independently verify that the steps were performed correctly.  In this way, we hope to promote decentralized trust through both understanding and transparency.  This Repo contains the decentralized verification solution.  Although these tools were developed specifically for digital notarizations according to texas statutes, the changes required to make this solution work for other states are trivial, and we encourage folks from other states to fork these tools for themselves.
