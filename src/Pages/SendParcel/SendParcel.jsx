import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const SendParcel = () => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const [pendingParcel, setPendingParcel] = useState(null);

  const type = watch("type"); // watch parcel type

  // Cost calculation function
  const calculateCost = (data) => {
    let baseCost = data.type === "document" ? 50 : 100;
    if (data.weight && data.type === "non-document") {
      baseCost += parseFloat(data.weight) * 10; // Example: 10 per kg
    }
    return baseCost;
  };

  const sendParcel = (data) => {
    const cost = calculateCost(data);
    setPendingParcel({ ...data, cost });

    toast(
      (t) => (
        <div className="p-2">
          <p className="font-semibold">Estimated Cost: ৳{cost}</p>
          <button
            onClick={() => {
              // Save to DB (mock)
              console.log("Saved:", { ...data, creation_date: new Date() });
              toast.dismiss(t.id);
              toast.success("Parcel Added Successfully!");
              reset();
              setPendingParcel(null);
            }}
            className="btn btn-sm btn-primary mt-2"
          >
            Confirm
          </button>
        </div>
      ),
      { duration: 5000 }
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-xl shadow-md">
      <Toaster />

      <h2 className="text-3xl font-bold mb-2 text-center">Send Parcel</h2>
      <p className="text-center font-semibold text-[#b8f208] mb-6">
        Please provide pickup & delivery details for your parcel
      </p>

      <form onSubmit={handleSubmit(sendParcel)} className="space-y-6">
        {/* Parcel Info */}
        <div className="p-4 bg-base-100 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-3">Parcel Info</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Type */}
            <div>
              <label className="label">Type</label>
              <select
                {...register("type", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Type</option>
                <option value="document">Document</option>
                <option value="non-document">Non-Document</option>
              </select>
              {errors.type && <span className="text-error text-sm">Type is required</span>}
            </div>

            {/* Title */}
            <div>
              <label className="label">Title</label>
              <input
                type="text"
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.title && <span className="text-error text-sm">Title is required</span>}
            </div>

            {/* Weight */}
            <div>
              <label className="label">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                {...register("weight", {
                  required: type === "non-document",
                })}
                className="input input-bordered w-full"
                disabled={type === "document"}
              />
              {errors.weight && <span className="text-error text-sm">Weight is required</span>}
            </div>
          </div>
        </div>

        {/* Sender Info */}
        <div className="p-4 bg-base-100 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-3">Sender Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              {...register("senderName", { required: true })}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Contact"
              {...register("senderContact", { required: true })}
              className="input input-bordered w-full"
            />
            <select
              {...register("senderRegion", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Region</option>
              <option value="dhaka">Dhaka</option>
              <option value="ctg">Chattogram</option>
            </select>
            <select
              {...register("senderCenter", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Service Center</option>
              <option value="center1">Center 1</option>
              <option value="center2">Center 2</option>
            </select>
            <input
              type="text"
              placeholder="Address"
              {...register("senderAddress", { required: true })}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Pickup Instruction"
              {...register("pickupInstruction", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Receiver Info */}
        <div className="p-4 bg-base-100 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-3">Receiver Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              {...register("receiverName", { required: true })}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Contact"
              {...register("receiverContact", { required: true })}
              className="input input-bordered w-full"
            />
            <select
              {...register("receiverRegion", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Region</option>
              <option value="dhaka">Dhaka</option>
              <option value="ctg">Chattogram</option>
            </select>
            <select
              {...register("receiverCenter", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Service Center</option>
              <option value="center1">Center 1</option>
              <option value="center2">Center 2</option>
            </select>
            <input
              type="text"
              placeholder="Address"
              {...register("receiverAddress", { required: true })}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Delivery Instruction"
              {...register("deliveryInstruction", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn bg-[#bbdd55] px-8">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
