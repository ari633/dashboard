import { useQuery } from "@tanstack/react-query";


export function useMyData(key, fetcher) {
  const query = useQuery({
    queryKey: [key],
    queryFn: () => fetcher,
  });
  if (!query.data) {
    return {
      query,
      totalEmployee: 0,
      totalEmployeeInactiveCompany: 0,
      percentageActiveInactive: 0,
      activeCompanies: [],
      inactiveCompanies: [],
      indonesiaCompanies: [],
      totalCompanies: 0,
      totalActiveCompanies: 0,
      totalInactiveCompanies: 0,
      percentageIndonesiaCompany: 0,
      totalIndonesiaCompany: 0,
    };
  }

  const totalEmployee = query.data.reduce((total, company) => total + company.employees, 0).toLocaleString();
  const inactiveCompanies = query.data.filter(company => company.status === 'inactive');
  const indonesiaCompanies = query.data.filter(company => company.country === 'Indonesia');
  const totalEmployeeInactiveCompany = inactiveCompanies.reduce((total, company) => total + company.employees, 0).toLocaleString();
  const activeCompanies = query.data.filter(company => company.status === 'active');
  const totalCompanies = query.data.length.toLocaleString();
  const totalActiveCompanies = activeCompanies.length.toLocaleString();
  const totalInactiveCompanies = inactiveCompanies.length.toLocaleString();
  const totalIndonesiaCompany = indonesiaCompanies.length.toLocaleString();
  const percentageIndonesiaCompany = ((totalIndonesiaCompany / totalCompanies) * 100).toLocaleString();
  const percentageActiveInactive = ((totalActiveCompanies / totalCompanies) * 100).toLocaleString();

  const categoryCount = query.data.reduce((acc, company) => {
    acc[company.category] = (acc[company.category] || 0) + 1;
    return acc;
  }, {});

  const top6ActiveCompanies = activeCompanies.sort((a, b) => b.employees - a.employees).slice(0, 6);

  return {
    query,
    totalEmployee,
    totalEmployeeInactiveCompany,
    percentageActiveInactive,
    activeCompanies,
    inactiveCompanies,
    totalCompanies,
    totalActiveCompanies,
    totalInactiveCompanies,
    percentageIndonesiaCompany,
    totalIndonesiaCompany,
    categoryCount,
    top6ActiveCompanies
  };
}
