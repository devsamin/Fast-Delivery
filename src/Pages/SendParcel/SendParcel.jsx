import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";



const SendParcel = () => {
  const serviceCenters = useLoaderData();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [pendingParcel, setPendingParcel] = useState(null);

  const type = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // Get unique regions
  const regions = [...new Set(serviceCenters.map((sc) => sc.region))];

  // Filter centers by region
  const getCentersByRegion = (region) => {
    if (!region) return [];
    const filtered = serviceCenters.filter(
  (sc) => sc.region.toLowerCase() === region?.toLowerCase()
);
    return filtered.flatMap((sc) => sc.covered_area);
  };

  // Cost calculation
  const calculateCost = (data) => {
    let baseCost = data.type === "document" ? 50 : 100;
    if (data.weight && data.type === "non-document") {
      baseCost += parseFloat(data.weight) * 10;
    }
    return baseCost;
  };

  const sendParcel = (data) => {
    const cost = calculateCost(data);
    setPendingParcel({ ...data, cost });

    toast((t) => (
      <div className="p-2">
        <p className="font-semibold">Estimated Cost: ৳{cost}</p>
        <button
          onClick={() => {
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
    ));
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
{/* Type */}
<div>
  <label className="label">Parcel Type</label>
  <div className="flex flex-col gap-2 mt-2">
    <label className="flex items-center gap-2">
      <input
        type="radio"
        value="document"
        {...register("type", { required: true })}
        className="radio w-5 h-5 border-[#b5ee08] checked:bg-[#b5ee08] checked:border-[#b5ee08] after:content-[''] after:bg-[#b5ee08]"
      />
      Document
    </label>
    <label className="flex items-center gap-2">
      <input
        type="radio"
        value="non-document"
        {...register("type", { required: true })}
        className="radio w-5 h-5 border-[#bbdd55] checked:bg-[#bbdd55] checked:border-[#bbdd55] after:content-[''] after:bg-[#bbdd55]"
      />
      Non-Document
    </label>
  </div>
  {errors.type && (
    <span className="text-error text-sm">
      Parcel Type is required
    </span>
  )}
</div>




            {/* Parcel Name */}
            <div>
              <label className="label">Parcel Name</label>
              <input
                type="text"
                placeholder="Parcel Name"
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.title && (
                <span className="text-error text-sm">
                  Parcel Name is required
                </span>
              )}
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
              {errors.weight && (
                <span className="text-error text-sm">Weight is required</span>
              )}
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
              {regions.map((region, idx) => (
                <option key={idx} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <select
              {...register("senderCenter", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Service Center</option>
              {getCentersByRegion(senderRegion).map((center, idx) => (
                <option key={idx} value={center}>
                  {center}
                </option>
              ))}
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
              {regions.map((region, idx) => (
                <option key={idx} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <select
              {...register("receiverCenter", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Service Center</option>
              {getCentersByRegion(receiverRegion).map((center, idx) => (
                <option key={idx} value={center}>
                  {center}
                </option>
              ))}
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
