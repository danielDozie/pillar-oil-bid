import { useState } from "react";
import OtpInput from "@/components/ui/react/otp";
import { Button } from "./button";

const OtpComponent = ({ otpValue }: { otpValue: number }) => {
    const [otp, setOtp] = useState<number>(0);

    const handleOtpChange = (value: number) => {
        setOtp(value);
    };

    //validate otp input
    const validateOtp = async () => {
        if (otp === otpValue) {
            const data = await fetch(`http://localhost:4321/api/auth/user-verified`, {
                method: "POST"
            });
            const res = data;
            if (res.status === 200) {
                window.location.href = res.url;
            }
        } else {
            /// do something else
            console.log("Otp Error")
        }
    }

    const resendOtp = async () => {
        const data = await fetch(`http://localhost:4321/api/auth/resend-otp`);
        const res = await data.json();

        if (res?.message) {
            console.log(res.message);
        }
    }

    return (
        <div className="flex flex-col w-full h-full justify-center align-middle">
            <h1 className="font-semibold text-3xl my-12">OTP Verification</h1>
            <OtpInput length={4} otp={otp} onOtpChange={handleOtpChange} />
            <div className="my-12">
                <p className="text text-slate-500">
                    Enter OTP sent to the email associated with your account
                </p>
                    <Button className="bg-transparent shadow-none p-0 hover:bg-unset" onClick={resendOtp}>
                        <p className="text-xs my-2 text-slate-500">
                            Not seen? Resend it.
                        </p>
                    </Button>

                <div className="flex flex-end justify-end">
                    <Button className="px-12 bg-primary" onClick={validateOtp}>
                        Verify
                    </Button>
                </div>
            </div>
        </div>
        
    );
};

export default OtpComponent;