import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import UseAuth from "../../hooks/UseAuth";

const SendParcel = () => {
  const serviceCenters = useLoaderData();
  const user = UseAuth(); // current logged-in user

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const type = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // Unique regions
  const regions = [...new Set(serviceCenters.map((sc) => sc.region))];

  // Centers by region
  const getCentersByRegion = (region) => {
    if (!region) return [];
    const filtered = serviceCenters.filter(
      (sc) => sc.region.toLowerCase() === region?.toLowerCase()
    );
    return filtered.flatMap((sc) => sc.covered_area);
  };

  // Cost calculation
  const calculateCost = (data) => {
    let baseCost = data.type === "document" ? 50 : 150;
    let extraCharges = 0;

    if (data.type === "non-document") {
      const weight = parseFloat(data.weight || 0);

      if (weight > 3) {
        const extraKg = weight - 3;
        extraCharges += extraKg * 40; // 40tk per extra kg
      }

      if (senderRegion !== receiverRegion) {
        extraCharges += 40; // outside district charge
      }
    }

    return {
      baseCost,
      extraCharges,
      total: baseCost + extraCharges,
    };
  };

  const sendParcel = (data) => {
    const { baseCost, extraCharges, total } = calculateCost(data);

    Swal.fire({
      title: "Delivery Cost Breakdown",
      html: `
        <div class="text-left space-y-2">
          <p><strong>Parcel Type:</strong> ${data.type}</p>
          <p><strong>Weight:</strong> ${data.weight || "-"} kg</p>
          <p><strong>Delivery Zone:</strong> ${
            senderRegion === receiverRegion ? "Inside District" : "Outside District"
          }</p>
          <hr/>
          <p><strong>Base Cost:</strong> ৳${baseCost}</p>
          <p><strong>Extra Charges:</strong> ৳${extraCharges}</p>
          <p class="text-xl font-bold text-green-600">Total Cost: ৳${total}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "✅ Proceed to Payment",
      cancelButtonText: "✖ Continue Editing",
      customClass: {
        popup: "rounded-xl shadow-lg p-6",
        confirmButton:
          "bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg",
        cancelButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg ml-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // ✅ Build parcel object
        const parcel = {
          ...data,
          cost: total,
          baseCost,
          extraCharges,
          tracking_id: `PCL-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          payment_status: "unpaid", // change to "paid" after payment integration
          delivery_status: "not_collected",
          creation_date: new Date().toISOString(),
          createdBy: user?.email || "guest",
        };

        console.log("Saved Parcel:", parcel);

        Swal.fire("Success!", "Parcel Added Successfully!", "success");

        // ✅ Example: Send to backend API
        /*
        fetch("http://localhost:5000/parcels", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parcel),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log("Parcel saved:", result);
          });
        */

        reset();
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-2 text-center">Send Parcel</h2>
      <p className="text-center font-semibold text-[#b8f208] mb-6">
        Please provide pickup & delivery details for your parcel
      </p>

      <form onSubmit={handleSubmit(sendParcel)} className="space-y-6">
        {/* === Parcel Info === */}
        <div className="p-4 bg-base-100 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-3">Parcel Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Type */}
            <div>
              <label className="label">Parcel Type</label>
              <div className="flex flex-col gap-2 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="document"
                    {...register("type", { required: true })}
                    className="radio w-5 h-5 border-[#b5ee08] checked:bg-[#b5ee08]"
                  />
                  Document
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="non-document"
                    {...register("type", { required: true })}
                    className="radio w-5 h-5 border-[#bbdd55] checked:bg-[#bbdd55]"
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
            </div>
          </div>
        </div>

        {/* === Sender Info === */}
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
          </div>
        </div>

        {/* === Receiver Info === */}
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
          </div>
        </div>

        {/* === Submit Button === */}
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
