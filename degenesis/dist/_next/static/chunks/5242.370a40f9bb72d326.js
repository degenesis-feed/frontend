"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5242],{160:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DEFAULT_BASE_URL=void 0,t.DEFAULT_BASE_URL="https://safe-client.safe.global"},8226:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LabelValue=t.StartTimeValue=t.DurationType=t.DetailedExecutionInfoType=t.TransactionListItemType=t.ConflictType=t.TransactionInfoType=t.SettingsInfoType=t.TransactionTokenType=t.TransferDirection=t.TransactionStatus=t.Operation=void 0,function(e){e[e.CALL=0]="CALL",e[e.DELEGATE=1]="DELEGATE"}(t.Operation||(t.Operation={})),function(e){e.AWAITING_CONFIRMATIONS="AWAITING_CONFIRMATIONS",e.AWAITING_EXECUTION="AWAITING_EXECUTION",e.CANCELLED="CANCELLED",e.FAILED="FAILED",e.SUCCESS="SUCCESS"}(t.TransactionStatus||(t.TransactionStatus={})),function(e){e.INCOMING="INCOMING",e.OUTGOING="OUTGOING",e.UNKNOWN="UNKNOWN"}(t.TransferDirection||(t.TransferDirection={})),function(e){e.ERC20="ERC20",e.ERC721="ERC721",e.NATIVE_COIN="NATIVE_COIN"}(t.TransactionTokenType||(t.TransactionTokenType={})),function(e){e.SET_FALLBACK_HANDLER="SET_FALLBACK_HANDLER",e.ADD_OWNER="ADD_OWNER",e.REMOVE_OWNER="REMOVE_OWNER",e.SWAP_OWNER="SWAP_OWNER",e.CHANGE_THRESHOLD="CHANGE_THRESHOLD",e.CHANGE_IMPLEMENTATION="CHANGE_IMPLEMENTATION",e.ENABLE_MODULE="ENABLE_MODULE",e.DISABLE_MODULE="DISABLE_MODULE",e.SET_GUARD="SET_GUARD",e.DELETE_GUARD="DELETE_GUARD"}(t.SettingsInfoType||(t.SettingsInfoType={})),function(e){e.TRANSFER="Transfer",e.SETTINGS_CHANGE="SettingsChange",e.CUSTOM="Custom",e.CREATION="Creation",e.SWAP_ORDER="SwapOrder",e.TWAP_ORDER="TwapOrder",e.SWAP_TRANSFER="SwapTransfer",e.NATIVE_STAKING_DEPOSIT="NativeStakingDeposit",e.NATIVE_STAKING_VALIDATORS_EXIT="NativeStakingValidatorsExit",e.NATIVE_STAKING_WITHDRAW="NativeStakingWithdraw"}(t.TransactionInfoType||(t.TransactionInfoType={})),function(e){e.NONE="None",e.HAS_NEXT="HasNext",e.END="End"}(t.ConflictType||(t.ConflictType={})),function(e){e.TRANSACTION="TRANSACTION",e.LABEL="LABEL",e.CONFLICT_HEADER="CONFLICT_HEADER",e.DATE_LABEL="DATE_LABEL"}(t.TransactionListItemType||(t.TransactionListItemType={})),function(e){e.MULTISIG="MULTISIG",e.MODULE="MODULE"}(t.DetailedExecutionInfoType||(t.DetailedExecutionInfoType={})),function(e){e.AUTO="AUTO",e.LIMIT_DURATION="LIMIT_DURATION"}(t.DurationType||(t.DurationType={})),function(e){e.AT_MINING_TIME="AT_MINING_TIME",e.AT_EPOCH="AT_EPOCH"}(t.StartTimeValue||(t.StartTimeValue={})),function(e){e.Queued="Queued",e.Next="Next"}(t.LabelValue||(t.LabelValue={}))},13073:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.TokenType=void 0,function(e){e.ERC20="ERC20",e.ERC721="ERC721",e.NATIVE_TOKEN="NATIVE_TOKEN",e.UNKNOWN="UNKNOWN"}(t.TokenType||(t.TokenType={}))},14746:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FEATURES=t.GAS_PRICE_TYPE=t.RPC_AUTHENTICATION=void 0,function(e){e.API_KEY_PATH="API_KEY_PATH",e.NO_AUTHENTICATION="NO_AUTHENTICATION",e.UNKNOWN="UNKNOWN"}(t.RPC_AUTHENTICATION||(t.RPC_AUTHENTICATION={})),function(e){e.ORACLE="ORACLE",e.FIXED="FIXED",e.FIXED_1559="FIXED1559",e.UNKNOWN="UNKNOWN"}(t.GAS_PRICE_TYPE||(t.GAS_PRICE_TYPE={})),function(e){e.ERC721="ERC721",e.SAFE_APPS="SAFE_APPS",e.CONTRACT_INTERACTION="CONTRACT_INTERACTION",e.DOMAIN_LOOKUP="DOMAIN_LOOKUP",e.SPENDING_LIMIT="SPENDING_LIMIT",e.EIP1559="EIP1559",e.SAFE_TX_GAS_OPTIONAL="SAFE_TX_GAS_OPTIONAL",e.TX_SIMULATION="TX_SIMULATION",e.EIP1271="EIP1271"}(t.FEATURES||(t.FEATURES={}))},15416:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},25159:function(e,t){var n=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))(function(i,s){function o(e){try{c(a.next(e))}catch(e){s(e)}}function r(e){try{c(a.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?i(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(o,r)}c((a=a.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0}),t.getData=t.fetchData=t.stringifyQuery=t.insertParams=void 0;let a=e=>"object"==typeof e&&null!==e&&"code"in e&&"message"in e;function i(e){return n(this,void 0,void 0,function*(){let t;try{t=yield e.json()}catch(e){t={}}if(!e.ok)throw Error(a(t)?`CGW error - ${t.code}: ${t.message}`:`CGW error - status ${e.statusText}`);return t})}t.insertParams=function(e,t){return t?Object.keys(t).reduce((e,n)=>{var a;return a=String(t[n]),e.replace(RegExp(`\\{${n}\\}`,"g"),a)},e):e},t.stringifyQuery=function(e){if(!e)return"";let t=new URLSearchParams;Object.keys(e).forEach(n=>{null!=e[n]&&t.append(n,String(e[n]))});let n=t.toString();return n?`?${n}`:""},t.fetchData=function(e,t,a,s,o){return n(this,void 0,void 0,function*(){let n={method:null!=t?t:"POST",headers:Object.assign({"Content-Type":"application/json"},s)};return o&&(n.credentials=o),null!=a&&(n.body="string"==typeof a?a:JSON.stringify(a)),i((yield fetch(e,n)))})},t.getData=function(e,t,a){return n(this,void 0,void 0,function*(){let n={method:"GET"};return t&&(n.headers=Object.assign(Object.assign({},t),{"Content-Type":"application/json"})),a&&(n.credentials=a),i((yield fetch(e,n)))})}},40960:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DeviceType=void 0,function(e){e.ANDROID="ANDROID",e.IOS="IOS",e.WEB="WEB"}(t.DeviceType||(t.DeviceType={}))},42777:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},64748:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SafeAppSocialPlatforms=t.SafeAppFeatures=t.SafeAppAccessPolicyTypes=void 0,function(e){e.NoRestrictions="NO_RESTRICTIONS",e.DomainAllowlist="DOMAIN_ALLOWLIST"}(t.SafeAppAccessPolicyTypes||(t.SafeAppAccessPolicyTypes={})),(t.SafeAppFeatures||(t.SafeAppFeatures={})).BATCHED_TRANSACTIONS="BATCHED_TRANSACTIONS",function(e){e.TWITTER="TWITTER",e.GITHUB="GITHUB",e.DISCORD="DISCORD",e.TELEGRAM="TELEGRAM"}(t.SafeAppSocialPlatforms||(t.SafeAppSocialPlatforms={}))},72387:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getEndpoint=t.deleteEndpoint=t.putEndpoint=t.postEndpoint=void 0;let a=n(25159);function i(e,t,n,i){let s=(0,a.insertParams)(t,n),o=(0,a.stringifyQuery)(i);return`${e}${s}${o}`}t.postEndpoint=function(e,t,n){let s=i(e,t,null==n?void 0:n.path,null==n?void 0:n.query);return(0,a.fetchData)(s,"POST",null==n?void 0:n.body,null==n?void 0:n.headers,null==n?void 0:n.credentials)},t.putEndpoint=function(e,t,n){let s=i(e,t,null==n?void 0:n.path,null==n?void 0:n.query);return(0,a.fetchData)(s,"PUT",null==n?void 0:n.body,null==n?void 0:n.headers,null==n?void 0:n.credentials)},t.deleteEndpoint=function(e,t,n){let s=i(e,t,null==n?void 0:n.path,null==n?void 0:n.query);return(0,a.fetchData)(s,"DELETE",null==n?void 0:n.body,null==n?void 0:n.headers,null==n?void 0:n.credentials)},t.getEndpoint=function(e,t,n,s){if(s)return(0,a.getData)(s,void 0,null==n?void 0:n.credentials);let o=i(e,t,null==n?void 0:n.path,null==n?void 0:n.query);return(0,a.getData)(o,null==n?void 0:n.headers,null==n?void 0:n.credentials)}},77232:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ImplementationVersionState=void 0,function(e){e.UP_TO_DATE="UP_TO_DATE",e.OUTDATED="OUTDATED",e.UNKNOWN="UNKNOWN"}(t.ImplementationVersionState||(t.ImplementationVersionState={}))},90045:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NativeStakingStatus=t.ConfirmationViewTypes=void 0,function(e){e.GENERIC="GENERIC",e.COW_SWAP_ORDER="COW_SWAP_ORDER",e.COW_SWAP_TWAP_ORDER="COW_SWAP_TWAP_ORDER",e.KILN_NATIVE_STAKING_DEPOSIT="KILN_NATIVE_STAKING_DEPOSIT",e.KILN_NATIVE_STAKING_VALIDATORS_EXIT="KILN_NATIVE_STAKING_VALIDATORS_EXIT",e.KILN_NATIVE_STAKING_WITHDRAW="KILN_NATIVE_STAKING_WITHDRAW"}(t.ConfirmationViewTypes||(t.ConfirmationViewTypes={})),function(e){e.NOT_STAKED="NOT_STAKED",e.ACTIVATING="ACTIVATING",e.DEPOSIT_IN_PROGRESS="DEPOSIT_IN_PROGRESS",e.ACTIVE="ACTIVE",e.EXIT_REQUESTED="EXIT_REQUESTED",e.EXITING="EXITING",e.EXITED="EXITED",e.SLASHED="SLASHED"}(t.NativeStakingStatus||(t.NativeStakingStatus={}))},93236:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SafeMessageStatus=t.SafeMessageListItemType=void 0,function(e){e.DATE_LABEL="DATE_LABEL",e.MESSAGE="MESSAGE"}(t.SafeMessageListItemType||(t.SafeMessageListItemType={})),function(e){e.NEEDS_CONFIRMATION="NEEDS_CONFIRMATION",e.CONFIRMED="CONFIRMED"}(t.SafeMessageStatus||(t.SafeMessageStatus={}))},95242:function(e,t,n){var a=this&&this.__createBinding||(Object.create?function(e,t,n,a){void 0===a&&(a=n);var i=Object.getOwnPropertyDescriptor(t,n);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,a,i)}:function(e,t,n,a){void 0===a&&(a=n),e[a]=t[n]}),i=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||a(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),t.getAccount=t.createAccount=t.verifyAuth=t.getAuthNonce=t.getContract=t.getSafeOverviews=t.unsubscribeAll=t.unsubscribeSingle=t.registerRecoveryModule=t.deleteRegisteredEmail=t.getRegisteredEmail=t.verifyEmail=t.resendEmailVerificationCode=t.changeEmail=t.registerEmail=t.unregisterDevice=t.unregisterSafe=t.registerDevice=t.getDelegates=t.confirmSafeMessage=t.proposeSafeMessage=t.getSafeMessage=t.getSafeMessages=t.getDecodedData=t.getMasterCopies=t.getSafeApps=t.getChainConfig=t.getChainsConfig=t.getTxPreview=t.getConfirmationView=t.proposeTransaction=t.getNonces=t.postSafeGasEstimation=t.deleteTransaction=t.getTransactionDetails=t.getTransactionQueue=t.getTransactionHistory=t.getCollectiblesPage=t.getCollectibles=t.getAllOwnedSafes=t.getOwnedSafes=t.getFiatCurrencies=t.getBalances=t.getMultisigTransactions=t.getModuleTransactions=t.getIncomingTransfers=t.getSafeInfo=t.getRelayCount=t.relayTransaction=t.setBaseUrl=void 0,t.getIndexingStatus=t.putAccountDataSettings=t.getAccountDataSettings=t.getAccountDataTypes=t.deleteAccount=void 0;let s=n(72387),o=n(160);i(n(77232),t),i(n(64748),t),i(n(8226),t),i(n(14746),t),i(n(13073),t),i(n(15416),t),i(n(90045),t),i(n(93236),t),i(n(40960),t),i(n(42777),t);let r=o.DEFAULT_BASE_URL;t.setBaseUrl=e=>{r=e},t.relayTransaction=function(e,t){return(0,s.postEndpoint)(r,"/v1/chains/{chainId}/relay",{path:{chainId:e},body:t})},t.getRelayCount=function(e,t){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/relay/{address}",{path:{chainId:e,address:t}})},t.getSafeInfo=function(e,t){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/safes/{address}",{path:{chainId:e,address:t}})},t.getIncomingTransfers=function(e,t,n,a){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/safes/{address}/incoming-transfers/",{path:{chainId:e,address:t},query:n},a)},t.getModuleTransactions=function(e,t,n,a){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/safes/{address}/module-transactions/",{path:{chainId:e,address:t},query:n},a)},t.getMultisigTransactions=function(e,t,n,a){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/safes/{address}/multisig-transactions/",{path:{chainId:e,address:t},query:n},a)},t.getBalances=function(e,t,n="usd",a={}){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/safes/{address}/balances/{currency}",{path:{chainId:e,address:t,currency:n},query:a})},t.getFiatCurrencies=function(){return(0,s.getEndpoint)(r,"/v1/balances/supported-fiat-codes")},t.getOwnedSafes=function(e,t){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/owners/{address}/safes",{path:{chainId:e,address:t}})},t.getAllOwnedSafes=function(e){return(0,s.getEndpoint)(r,"/v1/owners/{address}/safes",{path:{address:e}})},t.getCollectibles=function(e,t,n={}){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/safes/{address}/collectibles",{path:{chainId:e,address:t},query:n})},t.getCollectiblesPage=function(e,t,n={},a){return(0,s.getEndpoint)(r,"/v2/chains/{chainId}/safes/{address}/collectibles",{path:{chainId:e,address:t},query:n},a)},t.getTransactionHistory=function(e,t,n={},a){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/safes/{safe_address}/transactions/history",{path:{chainId:e,safe_address:t},query:n},a)},t.getTransactionQueue=function(e,t,n={},a){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/safes/{safe_address}/transactions/queued",{path:{chainId:e,safe_address:t},query:n},a)},t.getTransactionDetails=function(e,t){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/transactions/{transactionId}",{path:{chainId:e,transactionId:t}})},t.deleteTransaction=function(e,t,n){return(0,s.deleteEndpoint)(r,"/v1/chains/{chainId}/transactions/{safeTxHash}",{path:{chainId:e,safeTxHash:t},body:{signature:n}})},t.postSafeGasEstimation=function(e,t,n){return(0,s.postEndpoint)(r,"/v2/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations",{path:{chainId:e,safe_address:t},body:n})},t.getNonces=function(e,t){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/safes/{safe_address}/nonces",{path:{chainId:e,safe_address:t}})},t.proposeTransaction=function(e,t,n){return(0,s.postEndpoint)(r,"/v1/chains/{chainId}/transactions/{safe_address}/propose",{path:{chainId:e,safe_address:t},body:n})},t.getConfirmationView=function(e,t,n,a,i,o){return(0,s.postEndpoint)(r,"/v1/chains/{chainId}/safes/{safe_address}/views/transaction-confirmation",{path:{chainId:e,safe_address:t},body:{operation:n,data:a,to:i,value:o}})},t.getTxPreview=function(e,t,n,a,i,o){return(0,s.postEndpoint)(r,"/v1/chains/{chainId}/transactions/{safe_address}/preview",{path:{chainId:e,safe_address:t},body:{operation:n,data:a,to:i,value:o}})},t.getChainsConfig=function(e){return(0,s.getEndpoint)(r,"/v1/chains",{query:e})},t.getChainConfig=function(e){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}",{path:{chainId:e}})},t.getSafeApps=function(e,t={}){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/safe-apps",{path:{chainId:e},query:t})},t.getMasterCopies=function(e){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/about/master-copies",{path:{chainId:e}})},t.getDecodedData=function(e,t,n,a){return(0,s.postEndpoint)(r,"/v1/chains/{chainId}/data-decoder",{path:{chainId:e},body:{operation:t,data:n,to:a}})},t.getSafeMessages=function(e,t,n){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/safes/{safe_address}/messages",{path:{chainId:e,safe_address:t},query:{}},n)},t.getSafeMessage=function(e,t){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/messages/{message_hash}",{path:{chainId:e,message_hash:t}})},t.proposeSafeMessage=function(e,t,n){return(0,s.postEndpoint)(r,"/v1/chains/{chainId}/safes/{safe_address}/messages",{path:{chainId:e,safe_address:t},body:n})},t.confirmSafeMessage=function(e,t,n){return(0,s.postEndpoint)(r,"/v1/chains/{chainId}/messages/{message_hash}/signatures",{path:{chainId:e,message_hash:t},body:n})},t.getDelegates=function(e,t={}){return(0,s.getEndpoint)(r,"/v2/chains/{chainId}/delegates",{path:{chainId:e},query:t})},t.registerDevice=function(e){return(0,s.postEndpoint)(r,"/v1/register/notifications",{body:e})},t.unregisterSafe=function(e,t,n){return(0,s.deleteEndpoint)(r,"/v1/chains/{chainId}/notifications/devices/{uuid}/safes/{safe_address}",{path:{chainId:e,safe_address:t,uuid:n}})},t.unregisterDevice=function(e,t){return(0,s.deleteEndpoint)(r,"/v1/chains/{chainId}/notifications/devices/{uuid}",{path:{chainId:e,uuid:t}})},t.registerEmail=function(e,t,n,a){return(0,s.postEndpoint)(r,"/v1/chains/{chainId}/safes/{safe_address}/emails",{path:{chainId:e,safe_address:t},body:n,headers:a})},t.changeEmail=function(e,t,n,a,i){return(0,s.putEndpoint)(r,"/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}",{path:{chainId:e,safe_address:t,signer:n},body:a,headers:i})},t.resendEmailVerificationCode=function(e,t,n){return(0,s.postEndpoint)(r,"/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify-resend",{path:{chainId:e,safe_address:t,signer:n},body:""})},t.verifyEmail=function(e,t,n,a){return(0,s.putEndpoint)(r,"/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify",{path:{chainId:e,safe_address:t,signer:n},body:a})},t.getRegisteredEmail=function(e,t,n,a){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}",{path:{chainId:e,safe_address:t,signer:n},headers:a})},t.deleteRegisteredEmail=function(e,t,n,a){return(0,s.deleteEndpoint)(r,"/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}",{path:{chainId:e,safe_address:t,signer:n},headers:a})},t.registerRecoveryModule=function(e,t,n){return(0,s.postEndpoint)(r,"/v1/chains/{chainId}/safes/{safe_address}/recovery",{path:{chainId:e,safe_address:t},body:n})},t.unsubscribeSingle=function(e){return(0,s.deleteEndpoint)(r,"/v1/subscriptions",{query:e})},t.unsubscribeAll=function(e){return(0,s.deleteEndpoint)(r,"/v1/subscriptions/all",{query:e})},t.getSafeOverviews=function(e,t){return(0,s.getEndpoint)(r,"/v1/safes",{query:Object.assign(Object.assign({},t),{safes:e.join(",")})})},t.getContract=function(e,t){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/contracts/{contractAddress}",{path:{chainId:e,contractAddress:t}})},t.getAuthNonce=function(){return(0,s.getEndpoint)(r,"/v1/auth/nonce",{credentials:"include"})},t.verifyAuth=function(e){return(0,s.postEndpoint)(r,"/v1/auth/verify",{body:e,credentials:"include"})},t.createAccount=function(e){return(0,s.postEndpoint)(r,"/v1/accounts",{body:e,credentials:"include"})},t.getAccount=function(e){return(0,s.getEndpoint)(r,"/v1/accounts/{address}",{path:{address:e},credentials:"include"})},t.deleteAccount=function(e){return(0,s.deleteEndpoint)(r,"/v1/accounts/{address}",{path:{address:e},credentials:"include"})},t.getAccountDataTypes=function(){return(0,s.getEndpoint)(r,"/v1/accounts/data-types")},t.getAccountDataSettings=function(e){return(0,s.getEndpoint)(r,"/v1/accounts/{address}/data-settings",{path:{address:e},credentials:"include"})},t.putAccountDataSettings=function(e,t){return(0,s.putEndpoint)(r,"/v1/accounts/{address}/data-settings",{path:{address:e},body:t,credentials:"include"})},t.getIndexingStatus=function(e){return(0,s.getEndpoint)(r,"/v1/chains/{chainId}/about/indexing",{path:{chainId:e}})}}}]);