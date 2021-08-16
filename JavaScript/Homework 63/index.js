(function () {
    'use strict';
    //#1
    function bankAcc() {
        return {
            balance: 0,
            performTransaction: function (depOrWith) { this.balance += depOrWith; }
        };
    }
    let simpleBank1 = bankAcc();
    simpleBank1.performTransaction(15);
    console.log(simpleBank1.balance);

    let simpleBank2 = bankAcc();
    simpleBank2.performTransaction(-6);
    console.log(simpleBank2.balance);

    //#2
    function transaction(depOrWith) {
        return this.balance += depOrWith;
    }
    transaction.call(simpleBank1, 100);
    console.log(simpleBank1.balance);

    transaction.apply(simpleBank2, [10]);
    console.log(simpleBank2.balance);
}());