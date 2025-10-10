import React, { useState, useEffect } from "react";
import { MdVisibility, MdInfoOutline } from "react-icons/md";
import { Tooltip } from "@mui/material";
import axiosClient from "../../conf/axiosClient";
import type { BundleProductTypes } from "../../types/types";
import BundleProductDetail from "../../components/adminDashboard/bundleProduct/BundleProductDetail";
import ChercherPackProduct from "../../components/adminDashboard/bundleProduct/ChercherPackProduct";
import PostBundleProduct from "../../components/adminDashboard/bundleProduct/PostBundleProduct";

function AdminBundleProduct() {
  const [bundleProducts, setBundleProducts] = useState<BundleProductTypes[]>(
    []
  );
  const [detail, setDetail] = useState<BundleProductTypes | null>(null);

  const [searchName, setSearchName] = useState("");
  const [searchPack, setSearchPack] = useState("");
  const [searchCategorie, setSearchCategorie] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchPrix, setSearchPrix] = useState("");
  const [searchQuantity, setSearchQuantity] = useState("");
  const [searchStock, setSearchStock] = useState("");
  const [openChercher, setOpenChercher] = useState(false);

  const [bundles, setBundles] = useState<{ id_bundle: number; name: string }[]>(
    []
  );
  const [products, setProducts] = useState<
    {
      id_product: number;
      name: string;
      category?: { name: string };
      daily_price?: number;
      stock_available?: number;
      is_active?: boolean;
    }[]
  >([]);
  const [openPost, setOpenPost] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productRes, bundleRes] = await Promise.all([
        axiosClient.get("/products"),
        axiosClient.get("/bundles"),
      ]);

      setProducts(productRes.data);
      setBundles(bundleRes.data);

      setBundleProducts([]);
    } catch (err) {
      console.error("Erreur lors du chargement des produits et packs:", err);
    }
  };

  const handleBundleProductCreated = (newBundleProduct: BundleProductTypes) => {
    // On ajoute le nouveau produit au pack côté frontend
    setBundleProducts((prev) => [...prev, newBundleProduct]);
  };

  // Filtrage
  const filtered = bundleProducts.filter((item) => {
    const matchName = item.product.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const matchPack = item.bundle.name
      .toLowerCase()
      .includes(searchPack.toLowerCase());
    const matchCategorie = item.product.category?.name
      ?.toLowerCase()
      .includes(searchCategorie.toLowerCase());
    const matchStatus =
      searchStatus === "" ||
      (searchStatus === "actif" && item.product.is_active) ||
      (searchStatus === "inactif" && !item.product.is_active);
    const matchPrix =
      searchPrix === "" ||
      (item.product.daily_price !== undefined &&
        item.product.daily_price.toString().includes(searchPrix));
    const matchQuantity =
      searchQuantity === "" ||
      (item.quantity !== undefined &&
        item.quantity.toString().includes(searchQuantity));
    const matchStock =
      searchStock === "" ||
      (item.product.stock_available !== undefined &&
        item.product.stock_available.toString().includes(searchStock));

    return (
      matchName &&
      matchPack &&
      matchCategorie &&
      matchStatus &&
      matchPrix &&
      matchQuantity &&
      matchStock
    );
  });

  const grouped: Record<
    string,
    Record<string, BundleProductTypes[]>
  > = filtered.reduce((acc, item) => {
    const packName = item.bundle.name;
    const catName = item.product.category?.name ?? "Aucune";
    if (!acc[packName]) acc[packName] = {};
    if (!acc[packName][catName]) acc[packName][catName] = [];
    acc[packName][catName].push(item);
    return acc;
  }, {} as Record<string, Record<string, BundleProductTypes[]>>);

  return (
    <div className="p-4 pt-14">
      <title>Catalogues | BeLoyal</title>

      <div className="flex flex-row flex-wrap items-center gap-2 mb-4 bg-white p-6 sm:py-2 sm:px-4 rounded sticky top-14 z-20 shadow">
        <button
          onClick={() => setOpenPost(true)}
          className="px-4 py-2 bg-[#18769C] text-white rounded hover:bg-[#0f5a70] cursor-pointer"
        >
          Ajouter un produit à un Pack
        </button>

        <ChercherPackProduct
          searchName={searchName}
          setSearchName={setSearchName}
          searchPack={searchPack}
          setSearchPack={setSearchPack}
          searchCategorie={searchCategorie}
          setSearchCategorie={setSearchCategorie}
          searchStatus={searchStatus}
          setSearchStatus={setSearchStatus}
          searchPrix={searchPrix}
          setSearchPrix={setSearchPrix}
          searchQuantity={searchQuantity}
          setSearchQuantity={setSearchQuantity}
          searchStock={searchStock}
          setSearchStock={setSearchStock}
          open={openChercher}
          setOpen={setOpenChercher}
        />
      </div>

      <div className="overflow-hidden hover:overflow-auto max-h-[400px] bg-white shadow-lg rounded">
        <table className="min-w-full bg-white table-fixed">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Prix loc.</th>
              <th className="px-4 py-2">Quantité</th>
              <th className="px-4 py-2">Stock dispo</th>
              <th className="px-4 py-2">Catégorie</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(grouped).length === 0 && (
              <tr>
                <td colSpan={7} className="py-4 text-center">
                  <div className="flex flex-col items-center text-gray-400">
                    <MdInfoOutline className="text-4xl mb-2" />
                    Aucun produit trouvé
                  </div>
                </td>
              </tr>
            )}
            {Object.entries(grouped).map(([packName, categories]) => (
              <React.Fragment key={packName}>
                <tr className="bg-gray-300">
                  <td colSpan={7} className="px-4 py-2 font-semibold text-left">
                    {packName}
                  </td>
                </tr>
                {Object.entries(categories).map(([catName, items]) => (
                  <React.Fragment key={catName}>
                    <tr className="bg-gray-100">
                      <td
                        colSpan={7}
                        className="px-4 py-2 pl-8 font-medium text-left"
                      >
                        Catégorie : {catName}
                      </td>
                    </tr>
                    {items.map((item, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 even:bg-gray-50"
                      >
                        <td className="px-4 py-2">{item.product.name}</td>
                        <td className="px-4 py-2">
                          {item.product.daily_price?.toLocaleString()} Ar
                        </td>
                        <td className="px-4 py-2 text-center">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {item.product.stock_available}
                        </td>
                        <td className="px-4 py-2">
                          {item.product.category?.name ?? "Aucune"}
                        </td>
                        <td className="px-4 py-2">
                          <Tooltip
                            title={item.product.is_active ? "Actif" : "Inactif"}
                          >
                            <span
                              className={`px-2 py-1 rounded ${
                                item.product.is_active
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.product.is_active ? "Actif" : "Inactif"}
                            </span>
                          </Tooltip>
                        </td>
                        <td className="px-4 py-2 flex gap-2 justify-center">
                          <button
                            onClick={() => setDetail(item)}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded cursor-pointer"
                          >
                            <MdVisibility />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {detail && (
        <BundleProductDetail item={detail} onClose={() => setDetail(null)} />
      )}

      {openPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#1E2939]/80 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[500px]">
            <PostBundleProduct
              products={products.filter(
                (p): p is { id_product: number; name: string } =>
                  p.id_product !== undefined
              )}
              bundles={bundles}
              onClose={() => setOpenPost(false)}
              onBundleProductCreated={handleBundleProductCreated}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBundleProduct;
