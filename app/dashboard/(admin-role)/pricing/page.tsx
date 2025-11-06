import BackButton from "@/components/BackButton";
import Container from "@/components/container";
import PageHeader from "@/components/dashboard/PageHeader";
import { protectedAdminSession } from "@/lib/authProtected";

async function Pricing() {
  await protectedAdminSession();

  const pricingJSON = [
    {
      id: 1,
      name: "Basic",
      price: 0,
      features: [
        "25 links",
        "Unlimited clicks",
        "Custom logo",
        "Custom favicon",
      ],
    },
    {
      id: 2,
      name: "Pro",
      price: 9,
      features: [
        "Unlimited links",
        "Unlimited clicks",
        "Custom domain",
        "Custom logo",
        "Custom favicon",
        "Custom CSS",
        "Custom JS",
        "Premium support",
      ],
    },
    {
      id: 3,
      name: "Enterprise",
      price: 19,
      features: [
        "Unlimited links",
        "Unlimited clicks",
        "Custom domain",
        "Custom logo",
        "Custom favicon",
        "Custom CSS",
        "Custom JS",
        "Premium support",
        "Custom domain",
        "Custom logo",
        "Custom favicon",
        "Custom CSS",
        "Custom JS",
        "Premium support",
      ],
    },
  ];

  return (
    <Container>
      <PageHeader title="Pricing plans mgnt">
        <BackButton href="/dashboard" label="Back to home" />
      </PageHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {pricingJSON.map((plan) => (
          <div key={plan.id} className="bg-white p-5 rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="text-sm text-gray-600">
                {plan.price === 0 ? "Free" : "$"}
                {plan.price}
              </p>
            </div>
            <ul className="mt-5 space-y-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-gray-600">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Pricing;
