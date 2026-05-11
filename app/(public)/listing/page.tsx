import Container from "@/components/layout/container";

import MainHeader from "@/components/layout/header/main-header";

import ListingSearch from "@/components/listing/listing-search";

import FilterSidebar from "@/components/listing/filter-sidebar";

import ListingContent from "@/components/listing/listing-content";

export default function ListingPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <MainHeader />

      <section className="py-8">
        <Container>
          {/* SEARCH */}
          <div className="mb-8">
            <ListingSearch />
          </div>

          {/* CONTENT */}
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            {/* SIDEBAR */}
            <div>
              <FilterSidebar />
            </div>

            {/* LIST */}
            <div>
              <ListingContent />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
