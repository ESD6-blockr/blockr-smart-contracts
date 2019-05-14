export class ReviewContract {
    // The IPFS hash of the file that needs to be reviewed
    private ipfsHash: string

    // The owner address of the contract
    private teacher: string

    // An array of student addresses that are allowed
    // to review the file
    private students: string[]

    // Anonymous feedback
    private feedback: string[]

    constructor(hash: string, teacher: string, students: string[]) {
        this.ipfsHash = hash
        this.teacher = teacher
        this.students = students
        this.feedback = []
    }

    postFeedback(address: string, feedback: string) {
        if (!this.students.includes(address))
            return "Only students can review this"

        this.feedback.push(feedback);
    }

    getFeedback(address: string) {
        if (this.teacher != address)
            return "Only the teacher can fetch feedback"

        return this.feedback;
    }
}