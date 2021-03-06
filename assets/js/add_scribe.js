function add_scribe() {
    MetaMask_check();
    var tablet_address = document.getElementById("settings_tablet").value;
    var tablet_instance = get_tablet_instance(tablet_address);
    tablet_instance.add_scribe(document.getElementById("add_scribe_address").value, {from:global_active_account, value:""},
        function add_scribe_call(error, tx_scribe_add) {
            if (!error) {
                document.getElementById("add_scribe_result").innerHTML = "adding";
                document.getElementById("add_scribe_result").className = "pending";
                console.log("Add scribe tx: " + tx_scribe_add);
                var record_listener = setInterval(
                    function() {
                        web3.eth.getTransactionReceipt(tx_scribe_add, function(error, receipt) {
                            if(!error) {
                                console.log("receipt: " + receipt);
                                if (receipt) {
                                    if (receipt.status == 1) {
                                        document.getElementById("add_scribe_result").innerHTML = "scribe has been added!";
                                        document.getElementById("add_scribe_result").className = "";
                                    } else {
                                        document.getElementById("add_scribe_result").innerHTML = 
                                        "transaction: <a href='https://" + global_active_network + ".etherscan.io/tx/" + 
                                        receipt.transactionHash + "' target='_blank'>" +
                                        receipt.transactionHash + "</a> failed!";
                                        document.getElementById("add_scribe_result").className = "tx_error";
                                    }
                                    clearInterval(record_listener);
                                }
                            } else {
                                console.error(error);
                            }
                        })                                                        
                    }
                , 10000);    
            } else {
                console.log(error);
            }
        }
    );
}