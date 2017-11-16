function add_record() {
    MetaMask_check();
    if (Number(2048 - (new Blob([document.getElementById("record_to_add").value])).size) >= 0) {
        var tablet_address = document.getElementById("tablet").value;
        var tablet_instance = get_tablet_instance(tablet_address);
        tablet_instance.add_record(document.getElementById("record_to_add").value, {to:tablet_instance, value:""},
            function add_record_call(error, tx_record) {
                if (!error) {
                    document.getElementById("add_record_result").innerHTML = "pending record add";
                    document.getElementById("add_record_result").className = "pending";
                    console.log("Add record tx: " + tx_record);
                    var record_listener = setInterval(
                        function() {
                            web3.eth.getTransactionReceipt(tx_record, function(error, receipt) {
                                if(!error) {
                                    console.log("receipt: " + receipt);
                                    if (receipt) {
                                        if (receipt.status) {
                                            document.getElementById("add_record_result").innerHTML = "record has been added!";
                                            document.getElementById("add_record_result").className = "";
                                        } else {
                                            document.getElementById("add_record_result").innerHTML = "transaction error, check it on Etherscan";
                                            document.getElementById("add_record_result").className = "";
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
    } else {
        return false;
    }
}