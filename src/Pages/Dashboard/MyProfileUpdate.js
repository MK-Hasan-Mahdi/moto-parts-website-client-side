import React, { useEffect, useState } from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const MyProfileUpdate = () => {
    const [authUser] = useAuthState(auth);
    // console.log(authUser);
    const [updateProfile] = useUpdateProfile(auth);
    const [user, setUser] = useState({});
    // console.log(user);

    useEffect(() => {
        fetch(`http://localhost:5000/user/${authUser?.email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                email: `${authUser?.email}`,
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                setUser(json);
            });
    }, [authUser?.email]);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);
        const image = data?.image[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=b87c3c71cee6f1929847f8608981e477`;
        console.log(url);
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const userInfo = {
                        displayName: data.displayName || authUser.displayName,
                        mobile: data.mobile || user?.mobile,
                        address: data.address || user?.address,
                        institute: data.institute || user?.institute,
                        photoUrl: img || "https://foxdogconsultants.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
                    }
                    // console.log(userInfo);
                    fetch(`http://localhost:5000/updateuser/${authUser.email}`, {
                        method: "PUT",
                        headers: {
                            'content-type': 'application/json',
                            // email: `${authUser?.email}`,
                        },
                        body: JSON.stringify(userInfo)
                    })
                        .then(res => res.json())
                        .then(json => console.log(json));
                    toast.success("Profile Updated");
                    updateProfile({
                        displayName: data?.displayName || authUser?.displayName || "N/A",
                        photoURL: img || "https://foxdogconsultants.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
                    });
                    reset();
                }
            })

    };
    return (
        <div>
            <h1 className='mt-10 text-3xl text-center sp-style '>Update Your Profile</h1>
            <div className='md:w-1/2 w-3/4 mx-auto'>

                <form className='w-full mx-auto' onSubmit={handleSubmit(onSubmit)} >
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Update Name"
                            className="input input-bordered w-full"
                            {...register("displayName", {

                            })}
                        />
                        <label className="label">
                            {errors.displayName?.type === 'required' && <span className="label-text-alt text-red-500">{errors.displayName.message}</span>}
                        </label>

                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Update Email"
                            className="input input-bordered w-full"
                            value={authUser?.email}
                            disabled
                        />
                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Number</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Update Number"
                            className="input input-bordered w-full"
                            {...register("mobile", {

                            })}
                        />
                        <label className="label">
                            {errors.mobile?.type === 'required' && <span className="label-text-alt text-red-500">{errors.mobile.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Update Address"
                            className="input input-bordered w-full"
                            {...register("address", {

                            })}
                        />
                        <label className="label">
                            {errors.address?.type === 'required' && <span className="label-text-alt text-red-500">{errors.address.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">institute</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Update institute"
                            className="input input-bordered w-full "
                            {...register("institute", {

                            })}
                        />
                        <label className="label">
                            {errors.institute?.type === 'required' && <span className="label-text-alt text-red-500">{errors.institute.message}</span>}
                        </label>
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Update Image</span>
                        </label>
                        <input
                            type="file"
                            className="input input-bordered w-full cursor-pointer"
                            {...register("image", {

                            })}
                        />
                        <label className="label">
                            {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                        </label>
                    </div>

                    <input className='text-white bg-gradient-to-r from-primary to-secondary border-2 border-secondary hover:border-2 hover:border-primary hover:bg-gradient hover:from-white hover:to-white hover:text-primary transition-all transition-duration:150ms md:w-1/4 font-medium hover:font-medium px-5 py-2 rounded-md cursor-pointer' type="submit" value="Update" />
                </form>
            </div>
        </div>
    );
};

export default MyProfileUpdate;