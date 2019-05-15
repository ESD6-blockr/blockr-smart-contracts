"use strict";
exports.__esModule = true;
var ReviewContract = /** @class */ (function () {
    function ReviewContract(hash, teacher, students) {
        this.ipfsHash = hash;
        this.teacher = teacher;
        this.students = students;
        this.feedback = [];
    }
    ReviewContract.prototype.postFeedback = function (address, feedback) {
        if (!this.students.includes(address))
            return "Only students can review this";
        this.feedback.push(feedback);
    };
    ReviewContract.prototype.getFeedback = function (address) {
        if (this.teacher != address)
            return "Only the teacher can fetch feedback";
        return this.feedback;
    };
    return ReviewContract;
}());
exports.ReviewContract = ReviewContract;
