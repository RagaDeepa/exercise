/**
 * Created with IntelliJ IDEA.
 * User: ragadeepa
 * Date: 7/1/13
 * Time: 12:24 PM
 * To change this template use File | Settings | File Templates.
 */

Array.prototype.rev = function () {
    //this.reverse();
    var reversedArray = [];

    for (index = this.length - 1; index >= 0; index--) {
        reversedArray.push(this[index]);

    }
    return reversedArray;

}

Array.prototype.shuffle = function () {

    for (index = this.length - 1; index >= 0; index--) {
        var randomIndex = Math.floor(Math.random() * (this.length));
        swap(this, index, randomIndex);
    }
    return this;
}

var swap = function(arr,index1,index2){
    var tmp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = tmp;

}
