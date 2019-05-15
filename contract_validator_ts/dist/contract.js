"use strict";
class ReviewContract {
    constructor(hash, teacher, students) {
        this.ipfsHash = hash;
        this.teacher = teacher;
        this.students = students;
        this.feedback = [];
    }
    postFeedback(address, feedback) {
        // if (!this.students.includes(address))
        //     return "Only students can review this";
        this.feedback.push(feedback);
    }
    getFeedback(address) {
        if (this.teacher != address)
            return "Only the teacher can fetch feedback";
        return this.feedback;
    }
}
//# sourceMappingURL=contract.js.map