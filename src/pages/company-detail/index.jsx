import { useEffect, useState } from "react";
import Card from "../../components/card";
import { useParams } from "react-router-dom";
import { getAllCompanies, getCompany, updateCompany } from "../../services/companies";
import { useQuery } from "@tanstack/react-query";
import { StatusBadge } from "../../components/badge";
import Button from "../../components/button";
import Modal from "../../components/modal";
import useForm from "../../hooks/useForm";
import { useMyData } from "../../hooks/useDataCompany";

export default function CompanyDetail() {
  let { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues, handleChange] = useForm({});

  const {
    categoryCount,
  } = useMyData("companies", getAllCompanies());

  const { data, refetch } = useQuery({
    queryKey: ["companyDeatail", id],
    queryFn: () => getCompany(id),
  });

  useEffect(() => {
    if (data)
      setValues((prev) => ({
        ...prev,
        ...data,
        ...{ status: data.status === "active" ? true : false },
      }));
  }, [data, setValues]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...values,
      employees: Number(values.employees),
      status: values.status ? "active" : "inactive",
    };
    try {
      await updateCompany(id, payload);
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!data) return null;

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        callbackClose={() => setIsModalOpen(false)}
        title="Edit"
        subtitle={data.name}
      >
        <form onSubmit={handleSubmit} className="flex flex-col pt-5">
          <select
            className="px-2 py-2 bg-gray-100 text-gray-500 rounded-lg mb-4"
            required
            name="category"
            onChange={handleChange}
          >
            <option value="">--Category--</option>

            {categoryCount && Object.keys(categoryCount).map((item, i) => (<option key={`opt_${i}`} value={item}>{item}</option>))}            
          </select>
          <input
            required
            type="number"
            name="employees"
            value={values.employees}
            onChange={handleChange}
            placeholder="Total Employee"
            className="px-2 py-2 bg-gray-100 text-gray-500 rounded-lg mb-4"
          />
          <textarea
            className="px-2 py-2 bg-gray-100 text-gray-500 mb-4 rounded-lg"
            name="description"
            defaultValue={values.description || data.description}
          />

          <label className="mb-4">
            <input
              name="status"
              type="checkbox"
              checked={values.status}
              defaultValue={false}
              onChange={handleChange}
            />{" "}
            Active
          </label>

          <div className="grid grid-cols-2 gap-4">
            <Button label="Cancel" variant="outline" type="button" onClick={() => setIsModalOpen(false)}/>
            <Button label="Save" />
          </div>
        </form>
      </Modal>
      <Card>
        <div className="md:flex md:justify-between">
          <div className="space-y-2 md:py-4 md:flex md:items-center md:space-y-0 md:space-x-6">
            <img
              className="block mx-auto h-28 w-28 rounded-full md:mx-0 md:shrink-0"
              src={data.image}
              alt="Woman's Face"
            />
            <div className="flex items-center md:items-start flex-col text-center space-y-2 md:text-left">
              <div className="space-y-0.5">
                <p className="text-xl">{data.name}</p>
                <p className="text-slate-500">
                  {data.category} ({data.employees} employees)
                </p>
                <p>
                  {data.address}, {data.country}
                </p>
              </div>
              <StatusBadge status={data.status} />
            </div>
          </div>
          <div>
            <Button label="Edit" onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </Card>
    </div>
  );
}
