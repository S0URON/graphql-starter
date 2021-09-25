
import * as genOtpResolver from './OTP/getOtp'
import * as resendOtpResolver from './OTP/resendOtp'
import * as verifyOtpResolver from './OTP/verifyOtp'

export default {
    Query : {
        getOtp : genOtpResolver.getOtp,
        resendOtp: resendOtpResolver.resendOtp,
        verifyOtp: verifyOtpResolver.verifyOtp
    }
}