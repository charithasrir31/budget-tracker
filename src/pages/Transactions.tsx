import { Navigation } from "@/components/Navigation";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { useTransactions } from "@/hooks/useTransactions";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const Transactions = () => {
  const { transactions, handleAddTransaction, handleDeleteTransaction } = useTransactions();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Manage Transactions</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <TransactionForm onAddTransaction={handleAddTransaction} />
                </div>
                <div className="lg:col-span-2">
                  <TransactionList
                    transactions={transactions}
                    onDeleteTransaction={handleDeleteTransaction}
                  />
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Transactions;
