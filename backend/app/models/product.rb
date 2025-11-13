class Product < ApplicationRecord
  belongs_to :category, optional: true

  validates :name, presence: true
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :stock, numericality: { greater_than_or_equal_to: 0 }

  # Scopes for filtering
  scope :in_stock, -> { where('stock > ?', 0) }
  scope :by_category, ->(category_id) { where(category_id: category_id) }
  scope :search_by_name, ->(query) { where('name ILIKE ?', "%#{query}%") }
end

# Product.in_stock           # คืนสินค้าที่ stock > 0
# Product.by_category(3)     # คืนสินค้าที่อยู่ในหมวด category_id = 3
# Product.search_by_name("แชมพู")  # คืนสินค้าที่ชื่อมีคำว่า “แชมพู”


