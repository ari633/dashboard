import { useEffect } from "react";
import Card from "../../components/card";
import { useParams } from "react-router-dom";
import { getCompany } from "../../services/companies";
import { useQuery } from "@tanstack/react-query";
import { StatusBadge } from "../../components/badge";

export default function CompanyDetail() {
  let { id } = useParams();

  const { data, error, isPending } = useQuery({
    queryKey: [`company_${id}`],
    queryFn: () => getCompany(id),
  });

  useEffect(() => {}, []);

  if (isPending) return "Loading...";

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div>
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
            <button>Edit</button>
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
