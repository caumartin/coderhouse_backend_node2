export async function healthCheck(req, res, next) {
    try{
        res.status(200).json({ status: "ok" });
    } catch (error) {
        console.log(error);
    }
}